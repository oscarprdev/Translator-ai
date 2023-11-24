import { TranslatedInputSchema, TranslatedOutputSchema } from '../../../shared/validation/zod-schemas/translated-input.schema';
import { ZodValidation } from '../../../shared/validation/zod-validation';
import { TranslateInputPorts } from '../../application/translate/translate-input.ports';
import { TranslateInputInfra } from '../../infra/translate-input.infra';
import { TranslatedInput } from '../../application/common/types';

export class TranslateInputAdapter implements TranslateInputPorts {
	constructor(private readonly infra: TranslateInputInfra, private readonly zod: ZodValidation) {}

	private validateInput(input: string) {
		return this.zod.validate<string>(TranslatedInputSchema, input);
	}

	private validateOutput(input: TranslatedInput) {
		return this.zod.validate<TranslatedInput>(TranslatedOutputSchema, input);
	}

	async translateInput({ prompt }: TranslateInputPorts.TranslateInput): Promise<TranslateInputPorts.TranslateOutput> {
		const validInput = this.validateInput(prompt);
		const response = await this.infra.translate(validInput);

		return {
			data: this.validateOutput(response),
		};
	}
}
