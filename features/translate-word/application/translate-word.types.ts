import { UsecaseOutputState } from '../../shared/types/usecase-output-state';

export namespace TranslateWordTypes {
	export interface Input {
		input: string;
		langInput: string;
		langOutput: string;
	}

	export type Output = SuccessTranslateOuptut | ErrorTranslateOutput;

	export interface SuccessTranslateOuptut {
		data: {
			from: string;
			to: string;
		};
		state: UsecaseOutputState.success;
	}

	export interface ErrorTranslateOutput {
		error: string;
		state: UsecaseOutputState.error;
	}
}
