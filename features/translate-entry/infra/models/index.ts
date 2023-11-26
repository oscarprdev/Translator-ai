import { TranslatedEntry, Translations } from '@prisma/client';

export namespace TranslateEntryInfraTypes {
	export interface DescribeInput {
		word: string;
		langInput: string;
		langOutput: string;
	}

	export interface DescribeResponse {
		data: {
			inputResponse: TranslatedEntry | null;
			outputResponse: TranslatedEntry | null;
		};
	}

	export interface CreateInput {
		data: Omit<TranslatedEntry, 'id'>;
	}

	export interface CreateResponse {
		data: TranslatedEntry;
	}

	export type TranslateResponse = Omit<TranslatedEntry, 'id'>;
}
