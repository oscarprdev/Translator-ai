import { UsecaseOutputState } from '../../shared/types/usecase-output-state';
import { WordWithTranslations } from '../../shared/types/word-translated';

export namespace StoreWordTypes {
	export interface StoreWordInput {
		data: Omit<WordWithTranslations, 'id'>;
	}

	export type StoreWordOutput = SuccessStoreWordOutput | ErrorStoreWordOutput;

	export interface SuccessStoreWordOutput {
		data: WordWithTranslations;
		state: UsecaseOutputState.success;
	}

	export interface ErrorStoreWordOutput {
		error: string;
		state: UsecaseOutputState.error;
	}
}
