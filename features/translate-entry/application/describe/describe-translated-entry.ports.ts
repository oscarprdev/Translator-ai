import { TranslatedEntry } from '@prisma/client';

export interface DescribeTranslatedEntryPorts {
	describe(input: DescribeTranslatedEntryPorts.DescribePostInput): Promise<DescribeTranslatedEntryPorts.DescribePostOutput>;
}

export namespace DescribeTranslatedEntryPorts {
	export interface DescribePostInput {
		original: string;
	}

	export interface DescribePostOutput {
		data: TranslatedEntry | null;
	}
}
