import { ZodValidation } from '../../shared/validation/zod-validation';
import { TranslateWordPorts } from '../application/translate-word.ports';
import { TranslateWordInfra } from '../infra/translate-word.infra';
import { translateWordInputSchema } from './translate-word.adapter.schemas';

export class TranslateWordAdapter implements TranslateWordPorts {
	constructor(private readonly infra: TranslateWordInfra, private readonly zod: ZodValidation) {}

	private validateInput(input: string) {
		return this.zod.validate<string>(translateWordInputSchema, input);
	}

	async translateWord({ prompt }: TranslateWordPorts.Input): Promise<TranslateWordPorts.Output> {
		const validPrompt = this.validateInput(prompt);
		const response = await this.infra.translateWord({ prompt: validPrompt });

		return {
			from: response.from,
			to: response.to,
		};
	}
}
