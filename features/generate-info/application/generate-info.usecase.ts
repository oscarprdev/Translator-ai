import { UsecaseOutputState } from '../../shared/types/usecase-output-state';
import { GenerateInfoTypes } from './generate-info.types';
import { GenerateInfoPorts } from './generate-info.ports';

export interface GenerateInfoUsecase {
	generateInfo(input: GenerateInfoTypes.Input): Promise<GenerateInfoTypes.Output>;
}

export class DefaultGenerateInfoUsecase implements GenerateInfoUsecase {
	constructor(private readonly ports: GenerateInfoPorts) {}

	private kindPrompt(input: string, langInput: string) {
		return `Give me the kind of the input ${input} in ${langInput}, the output must has a data object in JSON following the pattern: 
			data: {
				kind: 'adjective' | 'noun' | 'verb' | etc.. // determine which one fits better with the input received, must be only one of this and this should be trasnlated to: ${langInput}.
			}`;
	}

	private phoneticsPrompt(input: string, langInput: string) {
		return `Give me the phonetics of the input ${input} in ${langInput}, the output must has a data object in JSON following the pattern: 
			data: {
				phonetics: [string] // Provide an array of the phonetic symbols of the word, in case of english language, provide both britain and american phonetical symbols with this pattern: UK [symbols] US [symbols]
			}`;
	}

	private wordPrompt(input: string, langInput: string, langOutput: string) {
		return `Translate me the input: ${input} from ${langInput} to ${langOutput}, the output must has a data object in JSON following the pattern: 
			data: {
				word: // input to translate, fix it if there is some miss-spell or any error on the input.
			}`;
	}

	private definitionPrompt(input: string, langInput: string) {
		return `Give me the definition of the input ${input} in ${langInput}, maximum 80 words, the output must has a data object in JSON following the pattern: 
			data: {
				definition: // Maximum 80 words, short definition of the input in ${langInput}.
			}`;
	}

	private synonymsPrompt(input: string, langInput: string) {
		return `Give me the synonyms of the input ${input} in ${langInput}, the output must has a data object in JSON following the pattern: 
			data: {
				synonyms: // string[] // synonyms of the input in ${langInput}, if it is a phrasal verb or an idiom, generate similar phrasal verbs or idioms with similar meaning.
			}`;
	}

	private antonymsPrompt(input: string, langInput: string) {
		return `Give me the antonyms of the input ${input} in ${langInput}, the output must has a data object in JSON following the pattern: 
			data: {
				antonyms: // string[] // antonyms of the input in ${langInput}, if it is a phrasal verb or an idiom, generate similar phrasal verbs or idioms with opposite meaning.
			}`;
	}

	private examplesPrompt(input: string, langInput: string) {
		return `Give me examples of the input ${input} in ${langInput}, the output must has a data object in JSON following the pattern: 
			data: {
				examples: // string[] // At least 3 sentences using the input in ${langInput}.
			}`;
	}

	private usesPrompt(input: string, langInput: string) {
		return `Give me uses of the input ${input} in ${langInput}, the output must has a data object in JSON following the pattern: 
			data: {
				uses: string // generate uses explanation in ${langInput} explaining in which situation should be used, no more than 50 words, the uses response must start with the pattern: "Use "word" to/when/for ...".
			}`;
	}

	private translationPrompt(input: string, langInput: string, langOutput: string) {
		return `Translate me the input: ${input} from ${langInput} to ${langOutput}, the output must has a data object in JSON following the pattern: 
			data: {
				translations: [
					{
						lang: ${langOutput}, // language of the translated word, this name must be in english, for instance: spanish, german, italian etc
						translation: The input value translated to ${langOutput}
					}
				]
			}`;
	}

	private mapGeneratedResponse(generatedInfo: any[]) {
		return generatedInfo.reduce((acc, el) => {
			const item = Object.entries(el);
			const [key, value] = item[0];
			acc[key] = value;

			return acc;
		}, {});
	}

	async generateInfo({ input, langInput, langOutput }: GenerateInfoTypes.Input): Promise<GenerateInfoTypes.Output> {
		try {
			const definitionPrompt = this.definitionPrompt(input, langInput);
			const kindPrompt = this.kindPrompt(input, langInput);
			const phoneticsPrompt = this.phoneticsPrompt(input, langInput);
			const wordPrompt = this.wordPrompt(input, langInput, langOutput);
			const synonymsPrompt = this.synonymsPrompt(input, langInput);
			const antonymsPrompt = this.antonymsPrompt(input, langInput);
			const examplesPrompt = this.examplesPrompt(input, langInput);
			const usesPrompt = this.usesPrompt(input, langInput);
			const translationPrompt = this.translationPrompt(input, langInput, langOutput);

			const generatedInfo = await Promise.all([
				this.ports.generateInfo({ prompt: definitionPrompt }),
				this.ports.generateInfo({ prompt: kindPrompt }),
				this.ports.generateInfo({ prompt: phoneticsPrompt }),
				this.ports.generateInfo({ prompt: wordPrompt }),
				this.ports.generateInfo({ prompt: synonymsPrompt }),
				this.ports.generateInfo({ prompt: antonymsPrompt }),
				this.ports.generateInfo({ prompt: examplesPrompt }),
				this.ports.generateInfo({ prompt: usesPrompt }),
				this.ports.generateInfo({ prompt: translationPrompt }),
			]);

			return {
				data: { ...this.mapGeneratedResponse(generatedInfo), lang: langInput },
				state: UsecaseOutputState.success,
			};
		} catch (error: any) {
			console.log(error);
			return {
				error: error.message || 'Unexpected error translating entry',
				state: UsecaseOutputState.error,
			};
		}
	}
}
