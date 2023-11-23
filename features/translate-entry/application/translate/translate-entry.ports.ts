import { TranslatedEntry } from '@prisma/client';

export interface TranslateEntryPorts {
	translate(input: TranslateEntryPorts.TranslateInput): Promise<TranslateEntryPorts.TranslateEntryOutput>;
}

export namespace TranslateEntryPorts {
	export interface TranslateInput {
		prompt: string;
	}

	export interface TranslateEntryOutput {
		data: Omit<TranslatedEntry, 'id'>;
	}
}
