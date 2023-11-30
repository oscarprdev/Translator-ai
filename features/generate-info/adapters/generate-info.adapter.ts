import { ZodValidation } from '../../shared/validation/zod-validation';
import { GenerateInfoPorts } from '../application/generate-info.ports';
import { GenerateInfoInfra } from '../infra/generate-info.infra';
import { generateInfoInputSchema } from './generate-info.adapter.schemas';

export class GenerateInfoAdapter implements GenerateInfoPorts {
	constructor(private readonly infra: GenerateInfoInfra, private readonly zod: ZodValidation) {}

	private validateInput(input: string) {
		return this.zod.validate<string>(generateInfoInputSchema, input);
	}

	async generateInfo({ prompt }: GenerateInfoPorts.Input): Promise<GenerateInfoPorts.Output> {
		const validInput = this.validateInput(prompt);

		const response = await this.infra.generateInfo(validInput);

		return {
			word: response.word,
			kind: response.kind,
			phonetics: response.phonetics,
			lang: response.lang,
			examples: response.examples,
			definition: response.definition,
			synonyms: response.synonyms,
			antonyms: response.antonyms,
			uses: response.uses,
			translations: response.translations,
		};
	}
}
