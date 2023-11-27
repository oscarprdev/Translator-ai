import { WordWithTranslations } from '../../shared/types/word-translated';
import { ZodValidation } from '../../shared/validation/zod-validation';
import { StoreWordPorts } from '../application/store-word.ports';
import { StoreWordInfra } from '../infra/store-word.infra';
import { storeWordInputSchema, storeWordOutputSchema } from './store-word.adapter.schemas';

export class StoreWordAdapter implements StoreWordPorts {
	constructor(private readonly infra: StoreWordInfra, private readonly zod: ZodValidation) {}

	private validateInput(input: Omit<WordWithTranslations, 'id'>) {
		return this.zod.validate<Omit<WordWithTranslations, 'id'>>(storeWordInputSchema, input);
	}

	private validateOutput(input: WordWithTranslations) {
		return this.zod.validate<WordWithTranslations>(storeWordOutputSchema, input);
	}

	async storeWord({ data }: StoreWordPorts.StoreWordInput): Promise<StoreWordPorts.StoreWordOutput> {
		const validInput = this.validateInput(data);

		const response = await this.infra.storeWord({ data: validInput });

		return {
			data: this.validateOutput(response.data),
		};
	}
}
