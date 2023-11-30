import { WordWithTranslations } from '../../shared/types/word-translated';
import { ZodValidation } from '../../shared/validation/zod-validation';
import { StoreWordPorts } from '../application/store-word.ports';
import { StoreWordInfra } from '../infra/store-word.infra';
import { storeWordInputSchema } from './store-word.adapter.schemas';

export class StoreWordAdapter implements StoreWordPorts {
	constructor(private readonly infra: StoreWordInfra, private readonly zod: ZodValidation) {}

	private validateInput(input: Omit<WordWithTranslations, 'id'>) {
		return this.zod.validate<Omit<WordWithTranslations, 'id'>>(storeWordInputSchema, input);
	}

	async storeWord({ data }: StoreWordPorts.StoreWordInput): Promise<StoreWordPorts.StoreWordOutput> {
		console.log(data);
		const validInput = this.validateInput(data);

		const response = await this.infra.storeWord({ data: validInput });

		return {
			data: {
				id: response.data.id,
				word: response.data.word,
				phonetics: response.data.phonetics,
				kind: response.data.kind,
				lang: response.data.lang,
				examples: response.data.examples,
				definition: response.data.definition,
				synonyms: response.data.synonyms,
				antonyms: response.data.antonyms,
				uses: response.data.uses,
				translations: response.data.translations,
			},
		};
	}
}
