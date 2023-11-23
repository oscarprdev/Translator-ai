import { TranslatedEntry } from '@prisma/client';

export interface StoreTranslatedEntryPorts {
	storeTranslatedEntry(
		input: StoreTranslatedEntryPorts.StoreTranslatedEntryInput
	): Promise<StoreTranslatedEntryPorts.StoreTranslatedEntryOutput>;
}

export namespace StoreTranslatedEntryPorts {
	export interface StoreTranslatedEntryInput {
		data: Omit<TranslatedEntry, 'id'>;
	}

	export interface StoreTranslatedEntryOutput {
		data: TranslatedEntry;
	}
}
