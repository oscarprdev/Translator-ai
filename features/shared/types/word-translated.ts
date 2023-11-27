import { TranslatedEntry } from '@prisma/client';

export interface Translation {
	language: string;
	translation: string;
}

export type WordWithTranslations = TranslatedEntry & { translations: Translation[] };
