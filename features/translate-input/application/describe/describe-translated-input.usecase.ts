import { UsecaseOutputState } from '../../../shared/types/usecase-output-state';
import { DescribeTranslatedInputPorts } from './describe-translated-input.ports';
import { DescribeTranslatedInputTypes } from './describe-translated-input.types';

export interface DescribeTranslatedInputUsecase {
	findStoredInput(
		input: DescribeTranslatedInputTypes.DescribeInput
	): Promise<DescribeTranslatedInputTypes.SuccessDescribeOutput | DescribeTranslatedInputTypes.ErrorDescribeOutput>;
}

export class DefaultDescribeTranslatedInputUsecase implements DescribeTranslatedInputUsecase {
	constructor(private readonly ports: DescribeTranslatedInputPorts) {}

	async findStoredInput({
		original,
	}: DescribeTranslatedInputTypes.DescribeInput): Promise<
		DescribeTranslatedInputTypes.SuccessDescribeOutput | DescribeTranslatedInputTypes.ErrorDescribeOutput
	> {
		try {
			const langInput = 'english';
			const langOutput = 'spanish';
			const response = await this.ports.describe({ original, langInput, langOutput });

			return {
				data: {
					original: response.original,
					translated: response.translated,
				},
				state: UsecaseOutputState.success,
			};
		} catch (error: any) {
			return {
				error: error.message || 'Unexpected error finding stored input',
				state: UsecaseOutputState.error,
			};
		}
	}
}
