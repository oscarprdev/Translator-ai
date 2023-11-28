import { TranslatedEntry } from '@prisma/client';

export interface Translation {
	lang: string;
	translation: string;
}

export type WordWithTranslations = TranslatedEntry & { translations: Translation[] };
