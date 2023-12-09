import { ZodValidation } from '../../shared/validation/zod-validation';
import { RecordSoundPorts, RecordSoundPortsTypes } from '../application/record-sound.ports';
import { RecordSoundInfra } from '../infra/record-sound.infra';
import { recordSoundOutputSchema } from './record-sound.adapter.schema';

export class RecordSoundAdapter implements RecordSoundPorts {
	constructor(private readonly infra: RecordSoundInfra, private readonly zod: ZodValidation) {}

	validateOutput(input: string) {
		const validText = this.zod.validate<string>(recordSoundOutputSchema, input);

		return validText.replace('.', '');
	}

	async recordSound({ lang, uint8Array }: RecordSoundPortsTypes.RecordSoundInput): Promise<RecordSoundPortsTypes.RecordSoundOutput> {
		const { text } = await this.infra.recordSoundInfra({ lang, uint8Array });

		return {
			text: this.validateOutput(text),
		};
	}
}
