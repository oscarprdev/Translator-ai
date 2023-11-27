import { UsecaseOutputState } from '../../shared/types/usecase-output-state';
import { GenerateInfoTypes } from './generate-info.types';
import { GenerateInfoPorts } from './generate-info.ports';

export interface GenerateInfoUsecase {
	generateInfo(input: GenerateInfoTypes.Input): Promise<GenerateInfoTypes.Output>;
}

export class DefaultGenerateInfoUsecase implements GenerateInfoUsecase {
	constructor(private readonly ports: GenerateInfoPorts) {}

	private generatePrompt(input: string, langInput: string, langOutput: string) {
		return `Translate me the input: ${input} from ${langInput} to ${langOutput}, 
		determine if the input is a word, a phrasal verb or an idiom,
		the output must has a data object in JSON following the pattern:
			   data: {
				kind: 'adjective' | 'noun' | 'verb' | etc.. // determine which one fits better with the input received, must be only one of this and this should be trasnlated to: ${langInput}
				word: // input to translate, fix it if there is some miss-spell or any error on the input.
				synonyms: // string[] // synonyms of the input in ${langInput}, if it is a phrasal verb or an idiom, generate similar phrasal verbs or idioms with similar meaning.
				antonyms: // string[] // antonyms of the input in ${langInput}, if it is a phrasal verb or an idiom, generate similar phrasal verbs or idioms with opposite meaning.
				definition: // Short definition of the input, no more than 100 words in ${langInput}.
				examples: // string[] // At least 3 sentences using the the input in ${langInput}.
				uses: string // generate uses explanation in ${langInput} explaining in which situation should be used, no more than 50 words, the uses response must start with the pattern: "Use "word" to/when/for ...".
				translations: [
					{
						language: ${langOutput},
						translation: The input value translated to ${langOutput}
					}
				]
			}
		`;
	}

	async generateInfo({ input, langInput, langOutput }: GenerateInfoTypes.Input): Promise<GenerateInfoTypes.Output> {
		try {
			const prompt = this.generatePrompt(input, langInput, langOutput);

			return {
				data: await this.ports.generateInfo({ prompt }),
				state: UsecaseOutputState.success,
			};
		} catch (error: any) {
			return {
				error: error.message || 'Unexpected error translating entry',
				state: UsecaseOutputState.error,
			};
		}
	}
}
