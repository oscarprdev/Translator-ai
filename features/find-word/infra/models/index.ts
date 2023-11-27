import { TranslatedEntry, Translations } from '@prisma/client';

export namespace FindWordInfraTypes {
	export interface Input {
		word: string;
		lang: string;
	}

	export interface Output {
		entry: TranslatedEntry | null;
		translations: Translations[] | null;
	}
}
