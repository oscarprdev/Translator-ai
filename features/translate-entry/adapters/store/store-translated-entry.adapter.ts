import { TranslatedEntry } from '@prisma/client';
import { StoreTranslatedEntryPorts } from '../../application/store/store-translated-entry.ports';
import {
	CreateTranslatedEntryInputSchema,
	CreateTranslatedEntryResponseSchema,
} from '../../../shared/validation/zod-schemas/create-translated-entry.schema';
import { ZodValidation } from '../../../shared/validation/zod-validation';
import { TranslateEntryInfra } from '../../infra/translate-entry.infra';

export class StoreTranslatedEntryAdapter implements StoreTranslatedEntryPorts {
	constructor(private readonly infra: TranslateEntryInfra, private readonly zod: ZodValidation) {}

	private validateInput(input: Omit<TranslatedEntry, 'id'>) {
		return this.zod.validate<Omit<TranslatedEntry, 'id'>>(CreateTranslatedEntryInputSchema, input);
	}

	private validateOutput(input: TranslatedEntry) {
		return this.zod.validate<TranslatedEntry>(CreateTranslatedEntryResponseSchema, input);
	}

	async storeTranslatedEntry({
		data,
	}: StoreTranslatedEntryPorts.StoreTranslatedEntryInput): Promise<StoreTranslatedEntryPorts.StoreTranslatedEntryOutput> {
		const validInput = this.validateInput(data);

		const response = await this.infra.create({ data: validInput });

		return {
			data: this.validateOutput(response.data),
		};
	}
}
