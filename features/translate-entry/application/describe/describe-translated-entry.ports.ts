import { TranslatedEntry } from '@prisma/client';

export interface DescribeTranslatedEntryPorts {
	describe(input: DescribeTranslatedEntryPorts.DescribePostInput): Promise<DescribeTranslatedEntryPorts.DescribePostOutput>;
}

export namespace DescribeTranslatedEntryPorts {
	export interface DescribePostInput {
		original: string;
		langInput: string;
		langOutput: string;
	}

	export interface DescribePostOutput {
		data: {
			inputResponse: TranslatedEntry | null;
			outputResponse: TranslatedEntry | null;
		};
	}
}
