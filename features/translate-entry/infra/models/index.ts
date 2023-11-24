import { TranslatedEntry } from '@prisma/client';

export namespace TranslateEntryInfraTypes {
	export interface DescribeInput {
		original: string;
	}

	export interface DescribeResponse {
		data: TranslatedEntry | null;
	}

	export interface CreateInput {
		data: Omit<TranslatedEntry, 'id'>;
	}

	export interface CreateResponse {
		data: TranslatedEntry;
	}

	export type TranslateResponse = Omit<TranslatedEntry, 'id'>;
}
