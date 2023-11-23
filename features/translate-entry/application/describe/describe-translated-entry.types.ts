import { TranslatedEntry } from '@prisma/client';

export namespace DescribeTranslatedEntryTypes {
	export interface DescribeInput {
		original: string;
	}

	export enum DescribeOutputState {
		success = 'success',
		error = 'error',
	}

	export interface SuccessDescribeOutput {
		state: DescribeOutputState.success;
		data: TranslatedEntry | null;
	}

	export interface ErrorDescribeOutput {
		state: DescribeOutputState.error;
		error: string;
	}
}
