import { TranslatedEntry } from '@prisma/client';
import { UsecaseOutputState } from '../../../shared/types/usecase-output-state';

export namespace StoreTranslatedEntryTypes {
	export interface StoreTranslatedEntryInput {
		data: Omit<TranslatedEntry, 'id'>;
	}

	export interface SuccessStoreTranslatedEntryOutput {
		data: TranslatedEntry;
		state: UsecaseOutputState.success;
	}

	export interface ErrorStoreTranslatedEntryOutput {
		error: string;
		state: UsecaseOutputState.error;
	}
}
