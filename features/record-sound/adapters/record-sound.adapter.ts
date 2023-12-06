import { ZodValidation } from '../../shared/validation/zod-validation';
import { RecordSoundPorts, RecordSoundPortsTypes } from '../application/record-sound.ports';
import { RecordSoundInfra } from '../infra/record-sound.infra';
import { recordSoundOutputSchema } from './record-sound.adapter.schema';

export class RecordSoundAdapter implements RecordSoundPorts {
	constructor(private readonly infra: RecordSoundInfra, private readonly zod: ZodValidation) {}

	validateOutput(input: string) {
		return this.zod.validate<string>(recordSoundOutputSchema, input);
	}

	async recordSound({ uint8Array }: RecordSoundPortsTypes.RecordSoundInput): Promise<RecordSoundPortsTypes.RecordSoundOutput> {
		const { text } = await this.infra.recordSoundInfra({ uint8Array });

		return {
			text: this.validateOutput(text),
		};
	}
}
