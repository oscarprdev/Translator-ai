import { TranslatedInput } from '../common/types';

export interface DescribeTranslatedInputPorts {
	describe(input: DescribeTranslatedInputPorts.DescribePostInput): Promise<DescribeTranslatedInputPorts.DescribePostOutput>;
}

export namespace DescribeTranslatedInputPorts {
	export interface DescribePostInput {
		original: string;
	}

	export interface DescribePostOutput {
		data: TranslatedInput | null;
	}
}
