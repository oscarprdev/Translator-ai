import { ZodValidation } from '../../shared/validation/zod-validation';
import { GenerateSoundPorts, GenerateSoundPortsTypes } from '../application/generate-sound.ports';
import { GenerateSoundInfra } from '../infra/generate-sound.infra';
import { generateSoundInputSchema } from './generate-sound.adapter-schema';

export class GenerateSoundAdapter implements GenerateSoundPorts {
	constructor(private readonly infra: GenerateSoundInfra, private readonly zod: ZodValidation) {}

	private validateInput(input: string) {
		return this.zod.validate<string>(generateSoundInputSchema, input);
	}

	async generateSound({ content }: GenerateSoundPortsTypes.GenerateSoundInput): Promise<GenerateSoundPortsTypes.GenerateSoundOutput> {
		const validInput = this.validateInput(content);

		return {
			audioSrc: await this.infra.generateSound(validInput),
		};
	}
}
