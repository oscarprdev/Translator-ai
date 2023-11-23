import { TranslatedEntry } from '@prisma/client';
import { DescribeTranslatedEntryPorts } from '../../application/describe/describe-translated-entry.ports';
import {
	DescribeTranslatedEntryInputSchema,
	DescribeTranslatedEntryResponseSchema,
} from '../../../shared/validation/zod-schemas/describe-translated-entry.schema';
import { ZodValidation } from '../../../shared/validation/zod-validation';
import { TranslateEntryInfra } from '../../infra/translate-entry.infra';

export class DescribeTranslatedEntryAdapter implements DescribeTranslatedEntryPorts {
	constructor(private readonly infra: TranslateEntryInfra, private readonly zod: ZodValidation) {}

	private validateInput(input: string) {
		return this.zod.validate<string>(DescribeTranslatedEntryInputSchema, input);
	}

	private validateOutput(input: TranslatedEntry) {
		return this.zod.validate<TranslatedEntry>(DescribeTranslatedEntryResponseSchema, input);
	}

	async describe({ original }: DescribeTranslatedEntryPorts.DescribePostInput): Promise<DescribeTranslatedEntryPorts.DescribePostOutput> {
		const response = await this.infra.describe({ original: this.validateInput(original) });

		return {
			data: response.data ? this.validateOutput(response.data) : null,
		};
	}
}
