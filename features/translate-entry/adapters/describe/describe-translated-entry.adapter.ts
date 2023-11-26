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

	private validateInput(input: DescribeTranslatedEntryPorts.DescribePostInput) {
		return this.zod.validate<DescribeTranslatedEntryPorts.DescribePostInput>(DescribeTranslatedEntryInputSchema, input);
	}

	private validateOutput(input: TranslatedEntry) {
		return this.zod.validate<TranslatedEntry>(DescribeTranslatedEntryResponseSchema, input);
	}

	async describe(input: DescribeTranslatedEntryPorts.DescribePostInput): Promise<DescribeTranslatedEntryPorts.DescribePostOutput> {
		const { original, langInput, langOutput } = this.validateInput(input);

		const {
			data: { inputResponse, outputResponse },
		} = await this.infra.describe({ word: original, langInput, langOutput });

		return {
			data: {
				inputResponse: inputResponse ? this.validateOutput(inputResponse) : null,
				outputResponse: outputResponse ? this.validateOutput(outputResponse) : null,
			},
		};
	}
}
