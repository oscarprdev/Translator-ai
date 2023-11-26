import { UsecaseOutputState } from '../../../shared/types/usecase-output-state';
import { TranslatedInput } from '../common/types';

export namespace DescribeTranslatedInputTypes {
	export interface DescribeInput {
		original: string;
	}

	export interface SuccessDescribeOutput {
		state: UsecaseOutputState.success;
		data: {
			original: string | null;
			translated: string | null;
		};
	}

	export interface ErrorDescribeOutput {
		state: UsecaseOutputState.error;
		error: string;
	}
}
