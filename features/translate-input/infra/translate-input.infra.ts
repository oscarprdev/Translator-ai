import { PrismaClient } from '@prisma/client';
import { TranslateInputInfraTypes } from './models/index';
import { OpenAiClient } from '../../shared/openai/openai';

export interface TranslateInputInfra {
	describe(input: TranslateInputInfraTypes.DescribeInput): Promise<TranslateInputInfraTypes.DescribeResponse>;
	translate(prompt: string): Promise<TranslateInputInfraTypes.TranslateResponse>;
}

export class DefaultTranslateInputInfra implements TranslateInputInfra {
	constructor(private readonly db: PrismaClient, private readonly openaiClient: OpenAiClient) {}

	async describe({ original }: TranslateInputInfraTypes.DescribeInput): Promise<TranslateInputInfraTypes.DescribeResponse> {
		try {
			const response = await this.db.translatedEntry.findUnique({
				where: {
					original,
				},
				select: {
					original: true,
					translated: true,
				},
			});

			return {
				data: response,
			};
		} catch (error: unknown) {
			throw new Error(JSON.stringify(error));
		}
	}

	async translate(prompt: string): Promise<TranslateInputInfraTypes.TranslateResponse> {
		return await this.openaiClient.execute<TranslateInputInfraTypes.TranslateResponse>(prompt);
	}
}
