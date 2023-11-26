import { TranslatedEntry } from '@prisma/client';

export interface DescribeTranslatedInputPorts {
	describe(input: DescribeTranslatedInputPorts.DescribePostInput): Promise<DescribeTranslatedInputPorts.DescribePostOutput>;
}

export namespace DescribeTranslatedInputPorts {
	export interface DescribePostInput {
		original: string;
		langInput: string;
		langOutput: string;
	}

	export interface DescribePostOutput {
		original: string | null;
		translated: string | null;
	}
}
