import { UsecaseOutputState } from '../../shared/types/usecase-output-state';
import { WordWithTranslations } from '../../shared/types/word-translated';

export namespace FindWordUsecaseTypes {
	export interface FindWordStoredInput {
		word: string;
		lang: string;
	}

	export type FindWordStoredOutput = SuccessFindWordStoredOutput | ErrorFindWordStoredOutput;

	export interface SuccessFindWordStoredOutput {
		state: UsecaseOutputState.success;
		data: WordWithTranslations | null;
	}

	export interface ErrorFindWordStoredOutput {
		state: UsecaseOutputState.error;
		error: string;
	}
}
