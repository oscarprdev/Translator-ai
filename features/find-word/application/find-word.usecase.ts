import { UsecaseOutputState } from '../../shared/types/usecase-output-state';
import { FindWordPorts } from './find-word.ports';
import { FindWordUsecaseTypes } from './find-word.types';

export interface FindWordUsecase {
	findWordStored(input: FindWordUsecaseTypes.FindWordStoredInput): Promise<FindWordUsecaseTypes.FindWordStoredOutput>;
}

export class DefaultFindWordUsecase implements FindWordUsecase {
	constructor(private readonly ports: FindWordPorts) {}

	async findWordStored({ word, lang }: FindWordUsecaseTypes.FindWordStoredInput): Promise<FindWordUsecaseTypes.FindWordStoredOutput> {
		try {
			const entry = await this.ports.findWord({ word, lang });

			return {
				data: entry,
				state: UsecaseOutputState.success,
			};
		} catch (error: any) {
			return {
				error: `Error finding stored entry: ${error.message || 'Unexpected'}`,
				state: UsecaseOutputState.error,
			};
		}
	}
}
