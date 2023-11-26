import { PrismaClient } from '@prisma/client';
import { DescribeEntryInfraTypes } from './models';

export interface DescribeEntryInfra {
	findWordFromDictionary(
		input: DescribeEntryInfraTypes.FindWordFromDictionaryInput
	): Promise<DescribeEntryInfraTypes.FindWordFromDictionaryOutput>;
}

export class DefaultDescribeEntryInfra implements DescribeEntryInfra {
	constructor(private readonly db: PrismaClient) {}

	async findWordFromDictionary({ word, lang }: DescribeEntryInfraTypes.FindWordFromDictionaryInput) {
		const dictionaryEntry = await this.db.dictionary.findUnique({
			where: {
				language: lang,
				entries: {
					some: {
						word,
					},
				},
			},
			include: {
				entries: {
					where: {
						word,
					},
					include: {
						translations: true,
					},
				},
			},
		});

		return {
			entry: dictionaryEntry?.entries[0] ?? null,
			translations: dictionaryEntry?.entries[0].translations ?? null,
		};
	}
}
