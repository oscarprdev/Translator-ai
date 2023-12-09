import { UsecaseOutputState } from '../../shared/types/usecase-output-state';
import { StoreWordPorts } from './store-word.ports';
import { StoreWordTypes } from './store-word.types';

export interface StoreWordUsecase {
	storeWord(input: StoreWordTypes.StoreWordInput): Promise<StoreWordTypes.StoreWordOutput>;
}

export class DefaultStoreWordUsecase implements StoreWordUsecase {
	constructor(private readonly ports: StoreWordPorts) {}

	async storeWord({ data }: StoreWordTypes.StoreWordInput): Promise<StoreWordTypes.StoreWordOutput> {
		try {
			console.log(data);
			const response = await this.ports.storeWord({ data });

			return {
				data: response.data,
				state: UsecaseOutputState.success,
			};
		} catch (error: any) {
			return {
				error: error.message || 'Unexpected error creating new dictionary entry',
				state: UsecaseOutputState.error,
			};
		}
	}
}
