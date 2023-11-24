import { PrismaClient } from '@prisma/client';
import { TranslateEntryInfraTypes } from './models/index';
import { OpenAiClient } from '../../shared/openai/openai';

export interface TranslateEntryInfra {
	describe(input: TranslateEntryInfraTypes.DescribeInput): Promise<TranslateEntryInfraTypes.DescribeResponse>;
	create(input: TranslateEntryInfraTypes.CreateInput): Promise<TranslateEntryInfraTypes.CreateResponse>;
	translate(prompt: string): Promise<TranslateEntryInfraTypes.TranslateResponse>;
}

export class DefaultTranslateEntryInfra implements TranslateEntryInfra {
	constructor(private readonly db: PrismaClient, private readonly openaiClient: OpenAiClient) {}

	async describe({ original }: TranslateEntryInfraTypes.DescribeInput): Promise<TranslateEntryInfraTypes.DescribeResponse> {
		try {
			const response = await this.db.translatedEntry.findUnique({
				where: {
					original,
				},
			});

			return {
				data: response,
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
