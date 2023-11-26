import { TranslatedEntry } from '@prisma/client';

export namespace HandleTranslatedEntryTypes {
	export interface HandleTranslateInput {
		input: string;
		languageInput: string;
		languageOutput: string;
	}

	export interface HandleTranslateOutput {
		entryInput: TranslatedEntry;
		entryOutput: TranslatedEntry;
	}
}
