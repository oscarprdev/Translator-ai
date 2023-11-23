import { UsecaseOutputState } from '../../../shared/types/usecase-output-state';
import { StoreTranslatedEntryPorts } from './store-translated-entry.ports';
import { StoreTranslatedEntryTypes } from './store-translated-entry.types';

export interface StoreTranslatedEntryUsecase {
	storeTranslatedEntry(
		input: StoreTranslatedEntryTypes.StoreTranslatedEntryInput
	): Promise<StoreTranslatedEntryTypes.SuccessStoreTranslatedEntryOutput | StoreTranslatedEntryTypes.ErrorStoreTranslatedEntryOutput>;
}

export class DefaultStoreTranslatedEntryUsecase implements StoreTranslatedEntryUsecase {
	constructor(private readonly ports: StoreTranslatedEntryPorts) {}

	async storeTranslatedEntry({
		data,
	}: StoreTranslatedEntryTypes.StoreTranslatedEntryInput): Promise<
		StoreTranslatedEntryTypes.SuccessStoreTranslatedEntryOutput | StoreTranslatedEntryTypes.ErrorStoreTranslatedEntryOutput
	> {
		try {
			const response = await this.ports.storeTranslatedEntry({ data });

			console.log(response);

			return {
				data: response.data,
				state: UsecaseOutputState.success,
			};
		} catch (error: any) {
			console.log(error);
			return {
				error: error.message || 'Unexpected error creating new dictionary entry',
				state: UsecaseOutputState.error,
			};
		}
	}
}
