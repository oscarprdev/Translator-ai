import { PrismaClient } from '@prisma/client';
import { FindWordInfraTypes } from './models';

export interface FindWordInfra {
	findWordFromDictionary(input: FindWordInfraTypes.Input): Promise<FindWordInfraTypes.Output>;
}

export class DefaultFindWordInfra implements FindWordInfra {
	constructor(private readonly db: PrismaClient) {}

	async findWordFromDictionary({ word, lang }: FindWordInfraTypes.Input) {
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
