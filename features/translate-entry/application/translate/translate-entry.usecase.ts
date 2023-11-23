import { UsecaseOutputState } from '../../../shared/types/usecase-output-state';
import { TranslateEntryPorts } from './translate-entry.ports';
import { TranslateEntryTypes as TranslateEntryTypes } from './translate-entry.types';

export interface TranslateEntryUsecase {
	translateEntry(
		input: TranslateEntryTypes.TranslateEntryInput
	): Promise<TranslateEntryTypes.SuccessTranslateEntryOuptut | TranslateEntryTypes.ErrorTranslateEntryOutput>;
}

export class DefaultTranslateEntryUsecase implements TranslateEntryUsecase {
	constructor(private readonly ports: TranslateEntryPorts) {}

	async translateEntry({
		input,
		languageInput,
		languageOutput,
	}: TranslateEntryTypes.TranslateEntryInput): Promise<
		TranslateEntryTypes.SuccessTranslateEntryOuptut | TranslateEntryTypes.ErrorTranslateEntryOutput
	> {
		try {
			const prompt = `Translate me the input: ${input} from ${languageInput} to ${languageOutput}, 
            determine if the input is a word, a phrasal verb or an idiom,
            the output must has a data object in JSON following the pattern:
            data: {
                    kind: 'word' | 'phrasal verb' | 'idiom' // determine which one fits better with the input received, must be only one of this
                    original: // input to translate.
                    translated: // input translated to ${languageOutput}.
                    synonyms: // string[] // synonyms of original input in ${languageInput}, if it is a phrasal verb or an idiom, provide similar phrasal verbs or idioms with similar meaning.
                    antonyms: // string[] // antonyms of original input in ${languageInput}, if it is a phrasal verb or an idiom, provide similar phrasal verbs or idioms with opposite meaning.
                    definition: // Short definition of original input, no more than 100 words in ${languageInput}.
                    example: // string[] // At least 3 sentences using the original input in ${languageInput}.
                    hint: string // Provide a hint in ${languageInput} explaining in which situation should be used, no more than 50 words.
                  }
            `;

			const { data } = await this.ports.translate({ prompt });

			return {
				data,
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
