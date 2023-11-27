import { UsecaseOutputState } from '../../shared/types/usecase-output-state';
import { WordWithTranslations } from '../../shared/types/word-translated';

export namespace GenerateInfoTypes {
	export interface Input {
		input: string;
		langInput: string;
		langOutput: string;
	}

	export type Output = SuccessGenerateInfoOuptut | ErrorGenerateInfoOutput;

	export interface SuccessGenerateInfoOuptut {
		data: Omit<WordWithTranslations, 'id'>;
		state: UsecaseOutputState.success;
	}

	export interface ErrorGenerateInfoOutput {
		error: string;
		state: UsecaseOutputState.error;
	}
}
