import { UsecaseOutputState } from '../../../shared/types/usecase-output-state';
import { TranslatedInput } from '../common/types';

export namespace TranslateInputTypes {
	export interface TranslateInput {
		input: string;
		languageInput: string;
		languageOutput: string;
	}

	export interface SuccessTranslateOuptut {
		data: TranslatedInput;
		state: UsecaseOutputState.success;
	}

	export interface ErrorTranslateOutput {
		error: string;
		state: UsecaseOutputState.error;
	}
}
