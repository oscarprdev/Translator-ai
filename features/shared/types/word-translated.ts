import { TranslatedEntry } from '@prisma/client';

export interface Translation {
	id: string;
	lang: string;
	translation: string;
	entryId: string;
}

export type WordWithTranslations = TranslatedEntry & { translations: Translation[] };
