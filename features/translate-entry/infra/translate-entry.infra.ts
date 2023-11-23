import { PrismaClient } from '@prisma/client';
import { TranslateEntryInfraTypes } from './models/index';
import { OpenAiClient } from '../../shared/openai/openai';

export interface TranslateEntryInfra {
	describe(input: TranslateEntryInfraTypes.DescribeInput): Promise<TranslateEntryInfraTypes.DescribeResponse>;
	create(input: TranslateEntryInfraTypes.CreateInput): Promise<TranslateEntryInfraTypes.CreateResponse>;
	translate<T>(prompt: string): Promise<T>;
}

export class DefaultTranslateEntryInfra implements TranslateEntryInfra {
	constructor(private readonly db: PrismaClient, private readonly openaiClient: OpenAiClient) {}

	async describe({ original }: TranslateEntryInfraTypes.DescribeInput): Promise<TranslateEntryInfraTypes.DescribeResponse> {
		try {
			const response = await this.db.translatedEntry.findFirst({
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
				data: {
					...data,
					example: data.example,
				},
			});

			return {
				data: response,
			};
		} catch (error) {
			console.log(error);
			throw new Error(JSON.stringify(error));
		}
	}

	async translate<T>(prompt: string): Promise<T> {
		try {
			const completion = await this.openaiClient.openai.chat.completions.create({
				messages: [
					{ role: 'system', content: this.openaiClient.role },
					{
						role: 'user',
						content: prompt,
					},
				],
				model: this.openaiClient.model,
				response_format: { type: 'json_object' },
			});

			const content = completion.choices[0].message.content;

			if (content && typeof content === 'string') {
				const { data } = JSON.parse(content);

				if (!data) {
					throw new Error('OpenAi request response is empty');
				}

				return data as T;
			}

			throw new Error('OpenAi request has failed');
		} catch (error: any) {
			throw new Error(error);
		}
	}
}
