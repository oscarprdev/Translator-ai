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
					synonymsTranslated: // string[] // Exactly same information that the 'synonyms' response but translated to ${languageOutput}
					antonyms: // string[] // antonyms of original input in ${languageInput}, if it is a phrasal verb or an idiom, provide similar phrasal verbs or idioms with opposite meaning.
					antonymsTranslated: // string[] // Exactly same information that the 'antonyms' response but translated to ${languageOutput}
					definition: // Short definition of original input, no more than 100 words in ${languageInput}.
					definitionTranslated: // string[] // Exactly same information that the 'definition' response but translated to ${languageOutput}
					example: // string[] // At least 3 sentences using the original input in ${languageInput}.
					exampleTranslated: // string[] // Exactly same information that the 'example' response but translated to ${languageOutput}
					uses: string // Provide uses explanation in ${languageInput} explaining in which situation should be used, no more than 50 words, the uses response must start with the pattern: "Use "word" to/when/for ...".
					usesTranslated: // string[] // Exactly same information that the 'uses' response but translated to ${languageOutput}
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
