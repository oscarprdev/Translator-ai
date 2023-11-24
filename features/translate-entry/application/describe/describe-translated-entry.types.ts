import { TranslatedEntry } from '@prisma/client';
import { UsecaseOutputState } from '../../../shared/types/usecase-output-state';

export namespace DescribeTranslatedEntryTypes {
	export interface DescribeInput {
		original: string;
	}

	export interface SuccessDescribeOutput {
		state: UsecaseOutputState.success;
		data: TranslatedEntry | null;
	}

	export interface ErrorDescribeOutput {
		state: UsecaseOutputState.error;
		error: string;
	}
}
