import { ZodValidation } from '../../shared/validation/zod-validation';
import { TranslateWordPorts } from '../application/translate-word.ports';
import { TranslateWordInfra } from '../infra/translate-word.infra';
import { translateWordInputSchema, translateWordOutputSchema } from './translate-word.adapter.schemas';

export class TranslateWordAdapter implements TranslateWordPorts {
	constructor(private readonly infra: TranslateWordInfra, private readonly zod: ZodValidation) {}

	private validateInput(input: string) {
		return this.zod.validate<string>(translateWordInputSchema, input);
	}

	private validateOutput(input: TranslateWordPorts.Output) {
		return this.zod.validate<TranslateWordPorts.Output>(translateWordOutputSchema, input);
	}

	async translateWord({ prompt }: TranslateWordPorts.Input): Promise<TranslateWordPorts.Output> {
		const validPrompt = this.validateInput(prompt);
		const response = await this.infra.translateWord({ prompt: validPrompt });

		return this.validateOutput(response);
	}
}
