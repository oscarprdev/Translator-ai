import { UsecaseOutputState } from '../../shared/types/usecase-output-state';
import { TranslateWordPorts } from './translate-word.ports';
import { TranslateWordTypes } from './translate-word.types';

export interface TranslateWordUsecase {
	translateWord(input: TranslateWordTypes.Input): Promise<TranslateWordTypes.Output>;
}

export class DefaultTranslateWordUsecase implements TranslateWordUsecase {
	constructor(private readonly ports: TranslateWordPorts) {}

	private generatePrompt(input: string, langInput: string, langOutput: string) {
		return `Translate me the input: ${input} from ${langInput} to ${langOutput}, 
        the output must be exactly and only the data object in JSON format following the pattern:
               data: {
                from: string // input to translate.
                to: string // input translated to ${langOutput}.
              }
        `;
	}

	async translateWord({ input, langInput, langOutput }: TranslateWordTypes.Input): Promise<TranslateWordTypes.Output> {
		try {
			const prompt = this.generatePrompt(input, langInput, langOutput);

			const { from, to } = await this.ports.translateWord({ prompt });

			return {
				data: {
					from,
					to,
				},
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
