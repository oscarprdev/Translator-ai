import { UsecaseOutputState } from '../../../shared/types/usecase-output-state';
import { DescribeTranslatedEntryPorts } from './describe-translated-entry.ports';
import { DescribeTranslatedEntryTypes } from './describe-translated-entry.types';

export interface DescribeTranslatedEntryUsecase {
	findStoredEntry(
		input: DescribeTranslatedEntryTypes.DescribeInput
	): Promise<DescribeTranslatedEntryTypes.SuccessDescribeOutput | DescribeTranslatedEntryTypes.ErrorDescribeOutput>;
}

export class DefaultDescribeTranslatedEntryUsecase implements DescribeTranslatedEntryUsecase {
	constructor(private readonly ports: DescribeTranslatedEntryPorts) {}

	async findStoredEntry({
		original,
	}: DescribeTranslatedEntryTypes.DescribeInput): Promise<
		DescribeTranslatedEntryTypes.SuccessDescribeOutput | DescribeTranslatedEntryTypes.ErrorDescribeOutput
	> {
		try {
			const langInput = 'english';
			const langOutput = 'spanish';
			const {
				data: { inputResponse, outputResponse },
			} = await this.ports.describe({ original, langInput, langOutput });

			return {
				data: {
					inputResponse,
					outputResponse,
				},
				state: UsecaseOutputState.success,
			};
		} catch (error: any) {
			return {
				error: error.message || 'Unexpected error finding stored entry',
				state: UsecaseOutputState.error,
			};
		}
	}
}
