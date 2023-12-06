import { RecordSoundPorts } from './record-sound.ports';
import { RecordSoundUsecaseTypes } from './record-sound.types';

export interface RecordSoundUsecase {
	recordSound(input: RecordSoundUsecaseTypes.RecordSoundInput): Promise<RecordSoundUsecaseTypes.RecordSoundOutput>;
}

export class DefaultRecordSoundUsecase implements RecordSoundUsecase {
	constructor(private readonly ports: RecordSoundPorts) {}

	async recordSound({ uint8Array }: RecordSoundUsecaseTypes.RecordSoundInput): Promise<RecordSoundUsecaseTypes.RecordSoundOutput> {
		const { text } = await this.ports.recordSound({ uint8Array });

		return { text };
	}
}
