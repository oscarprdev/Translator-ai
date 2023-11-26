import { PrismaClient } from '@prisma/client';
import { TranslateInputInfraTypes } from './models/index';
import { OpenAiClient } from '../../shared/openai/openai';
import { DescribeEntryInfra } from '../../shared/infra/describe-entry.infra';

export interface TranslateInputInfra {
	describe(input: TranslateInputInfraTypes.DescribeInput): Promise<TranslateInputInfraTypes.DescribeResponse>;
	translate(prompt: string): Promise<TranslateInputInfraTypes.TranslateResponse>;
}

export class DefaultTranslateInputInfra implements TranslateInputInfra {
	constructor(
		private readonly db: PrismaClient,
		private readonly openaiClient: OpenAiClient,
		private readonly describeEntryInfra: DescribeEntryInfra
	) {}

	async describe({
		word,
		langInput,
		langOutput,
	}: TranslateInputInfraTypes.DescribeInput): Promise<TranslateInputInfraTypes.DescribeResponse> {
		try {
			const { entry, translations } = await this.describeEntryInfra.findWordFromDictionary({ word, lang: langInput });

			console.log(translations);
			const wordTranslated = translations?.find((trans) => trans.language === langOutput);

			console.log(wordTranslated);

			return {
				original: entry?.word ?? null,
				translated: wordTranslated?.translation ?? null,
			};
		} catch (error: unknown) {
			throw new Error(JSON.stringify(error));
		}
	}

	async translate(prompt: string): Promise<TranslateInputInfraTypes.TranslateResponse> {
		return await this.openaiClient.execute<TranslateInputInfraTypes.TranslateResponse>(prompt);
	}
}
