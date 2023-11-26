import { PrismaClient, Dictionary } from '@prisma/client';
import { TranslateEntryInfraTypes } from './models/index';
import { OpenAiClient } from '../../shared/openai/openai';
import { DescribeEntryInfra } from '../../shared/infra/describe-entry.infra';

export interface TranslateEntryInfra {
	describe(input: TranslateEntryInfraTypes.DescribeInput): Promise<TranslateEntryInfraTypes.DescribeResponse>;
	create(input: TranslateEntryInfraTypes.CreateInput): Promise<TranslateEntryInfraTypes.CreateResponse>;
	translate(prompt: string): Promise<TranslateEntryInfraTypes.TranslateResponse>;
}

export class DefaultTranslateEntryInfra implements TranslateEntryInfra {
	constructor(
		private readonly db: PrismaClient,
		private readonly openaiClient: OpenAiClient,
		private readonly describeEntryInfra: DescribeEntryInfra
	) {}

	async describe({
		word,
		langInput,
		langOutput,
	}: TranslateEntryInfraTypes.DescribeInput): Promise<TranslateEntryInfraTypes.DescribeResponse> {
		try {
			const inputResponse = await this.describeEntryInfra.findWordFromDictionary({ word, lang: langInput });
			const wordTranslated = inputResponse.translations?.find((trans) => trans.language === langOutput);

			if (!inputResponse.entry || !inputResponse.translations?.length || !wordTranslated) {
				return {
					data: {
						inputResponse: null,
						outputResponse: null,
					},
				};
			}

			const outputResponse = await this.describeEntryInfra.findWordFromDictionary({
				word: wordTranslated.translation,
				lang: langOutput,
			});

			return {
				data: {
					inputResponse: inputResponse.entry,
					outputResponse: outputResponse.entry,
				},
			};
		} catch (error: unknown) {
			throw new Error(JSON.stringify(error));
		}
	}

	async create({ data }: TranslateEntryInfraTypes.CreateInput): Promise<TranslateEntryInfraTypes.CreateResponse> {
		try {
			const response = await this.db.translatedEntry.create({
				data,
			});

			return {
				data: response,
			};
		} catch (error: unknown) {
			throw new Error(JSON.stringify(error));
		}
	}

	async translate(prompt: string): Promise<TranslateEntryInfraTypes.TranslateResponse> {
		return await this.openaiClient.execute<TranslateEntryInfraTypes.TranslateResponse>(prompt);
	}
}
