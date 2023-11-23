import { TranslatedEntry } from '@prisma/client';
import { UsecaseOutputState } from '../../../shared/types/usecase-output-state';

export namespace TranslateEntryTypes {
	export interface TranslateEntryInput {
		input: string;
		languageInput: string;
		languageOutput: string;
	}

	export interface SuccessTranslateEntryOuptut {
		data: Omit<TranslatedEntry, 'id'>;
		state: UsecaseOutputState.success;
	}

	export interface ErrorTranslateEntryOutput {
		error: string;
		state: UsecaseOutputState.error;
	}
}
