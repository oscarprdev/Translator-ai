import { UsecaseOutputState } from '../../../shared/types/usecase-output-state';
import { TranslateInputPorts } from './translate-input.ports';
import { TranslateInputTypes } from './translate-input.types';

export interface TranslateInputUsecase {
	translateInput(
		input: TranslateInputTypes.TranslateInput
	): Promise<TranslateInputTypes.SuccessTranslateOuptut | TranslateInputTypes.ErrorTranslateOutput>;
}

export class DefaultTranslateInputUsecase implements TranslateInputUsecase {
	constructor(private readonly ports: TranslateInputPorts) {}

	async translateInput({
		input,
		languageInput,
		languageOutput,
	}: TranslateInputTypes.TranslateInput): Promise<TranslateInputTypes.SuccessTranslateOuptut | TranslateInputTypes.ErrorTranslateOutput> {
		try {
			const prompt = `Translate me the input: ${input} from ${languageInput} to ${languageOutput}, 
            the output must has a data object in JSON following the pattern:
           		data: {
                    original: // input to translate.
                    translated: // input translated to ${languageOutput}.
                  }
            `;

			const { data } = await this.ports.translateInput({ prompt });

			return {
				data,
				state: UsecaseOutputState.success,
			};
		} catch (error: any) {
			return {
				error: error.message || 'Unexpected error translating input',
				state: UsecaseOutputState.error,
			};
		}
	}
}
