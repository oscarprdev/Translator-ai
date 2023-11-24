import { ZodValidation } from '../../../shared/validation/zod-validation';
import { DescribeTranslatedInputPorts } from '../../application/describe/describe-translated-input.ports';
import { TranslateInputInfra } from '../../infra/translate-input.infra';
import { TranslatedInputSchema, TranslatedOutputSchema } from '../../../shared/validation/zod-schemas/translated-input.schema';
import { TranslatedInput } from '../../application/common/types';

export class DescribeTranslatedInputAdapter implements DescribeTranslatedInputPorts {
	constructor(private readonly infra: TranslateInputInfra, private readonly zod: ZodValidation) {}

	private validateInput(input: string) {
		return this.zod.validate<string>(TranslatedInputSchema, input);
	}

	private validateOutput(input: TranslatedInput) {
		return this.zod.validate<TranslatedInput>(TranslatedOutputSchema, input);
	}

	async describe({ original }: DescribeTranslatedInputPorts.DescribePostInput): Promise<DescribeTranslatedInputPorts.DescribePostOutput> {
		const response = await this.infra.describe({ original: this.validateInput(original) });

		return {
			data: response.data ? this.validateOutput(response.data) : null,
		};
	}
}
