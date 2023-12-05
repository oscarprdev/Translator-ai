import { PrismaClient } from '@prisma/client';
import { StoreWordInfraTypes } from './models';
import { Translation } from '../../shared/types/word-translated';

export interface StoreWordInfra {
	storeWord(input: StoreWordInfraTypes.Input): Promise<StoreWordInfraTypes.Output>;
}

export class DefaultStoreWordInfra implements StoreWordInfra {
	constructor(private readonly db: PrismaClient) {}

	async storeWord({ data }: StoreWordInfraTypes.Input): Promise<StoreWordInfraTypes.Output> {
		try {
			const dictionaryAlreadyStored = await this.db.dictionary.findFirst({
				where: { language: data.lang },
				include: {
					entries: {
						include: {
							translations: true,
						},
					},
				},
			});

			const dataAlreadyStored = dictionaryAlreadyStored?.entries.find((entry) => entry.word === data.word);

			if (dataAlreadyStored) {
				const dataTranslationUpdated = await this.db.translatedEntry.update({
					where: {
						word: data.word,
					},
					data: {
						kind: data.kind,
						lang: data.lang,
						word: data.word,
						phonetics: data.phonetics,
						synonyms: data.synonyms,
						antonyms: data.antonyms,
						examples: data.examples,
						definition: data.definition,
						uses: data.uses,
						translations: {
							set: [...dataAlreadyStored.translations, ...data.translations],
						},
					},
					include: {
						translations: true,
					},
				});

				return {
					data: dataTranslationUpdated,
				};
			}

			const response = await this.db.dictionary.upsert({
				where: { language: data.lang },
				create: {
					language: data.lang,
					entries: {
						create: {
							kind: data.kind,
							lang: data.lang,
							word: data.word,
							phonetics: data.phonetics,
							synonyms: data.synonyms,
							antonyms: data.antonyms,
							examples: data.examples,
							definition: data.definition,
							uses: data.uses,
							translations: {
								create: [{ lang: data.translations[0].lang, translation: data.translations[0].translation }],
							},
						},
					},
				},
				update: {
					entries: {
						create: {
							kind: data.kind,
							lang: data.lang,
							word: data.word,
							phonetics: data.phonetics,
							synonyms: data.synonyms,
							antonyms: data.antonyms,
							examples: data.examples,
							definition: data.definition,
							uses: data.uses,
							translations: {
								create: [{ lang: data.translations[0].lang, translation: data.translations[0].translation }],
							},
						},
					},
				},
				include: {
					entries: {
						include: {
							translations: true,
						},
					},
				},
			});

			const storedEntry = response.entries.find((entry) => entry.word === data.word);

			if (storedEntry) {
				return {
					data: storedEntry,
				};
			} else {
				throw new Error('Error storing in database the translated entry');
			}
		} catch (error: unknown) {
			throw new Error(JSON.stringify(error));
		}
	}
}
