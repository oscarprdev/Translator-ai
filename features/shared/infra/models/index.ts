import { TranslatedEntry, Translations } from '@prisma/client';

export namespace DescribeEntryInfraTypes {
	export interface FindWordFromDictionaryInput {
		word: string;
		lang: string;
	}

	export interface FindWordFromDictionaryOutput {
		entry: TranslatedEntry | null;
		translations: Translations[] | null;
	}
}
