import { ZodValidation } from '../../../shared/validation/zod-validation';
import { DescribeTranslatedInputPorts } from '../../application/describe/describe-translated-input.ports';
import { TranslateInputInfra } from '../../infra/translate-input.infra';
import { TranslatedInputSchema, TranslatedOutputSchema } from '../../../shared/validation/zod-schemas/translated-input.schema';
import { TranslatedInput } from '../../application/common/types';

export class DescribeTranslatedInputAdapter implements DescribeTranslatedInputPorts {
	constructor(private readonly infra: TranslateInputInfra, private readonly zod: ZodValidation) {}

	private validateInput(input: DescribeTranslatedInputPorts.DescribePostInput) {
		return this.zod.validate<DescribeTranslatedInputPorts.DescribePostInput>(TranslatedInputSchema, input);
	}

	private validateOutput(input: TranslatedInput) {
		return this.zod.validate<TranslatedInput>(TranslatedOutputSchema, input);
	}

	async describe(input: DescribeTranslatedInputPorts.DescribePostInput): Promise<DescribeTranslatedInputPorts.DescribePostOutput> {
		const { original, langInput, langOutput } = this.validateInput(input);

		const response = await this.infra.describe({ word: original, langInput, langOutput });

		return {
			original: response.original,
			translated: response.translated,
		};
	}
}
