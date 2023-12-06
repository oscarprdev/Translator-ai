import { OpenAiClient } from '../../shared/openai/openai';
import { RecordSoundInfraInput, RecordSoundInfraOutput } from './models';

export interface RecordSoundInfra {
	recordSoundInfra(input: RecordSoundInfraInput): Promise<RecordSoundInfraOutput>;
}

export class DefaultRecordSoundInfra implements RecordSoundInfra {
	constructor(private readonly openai: OpenAiClient) {}

	private generateAudiTranscriptionBody(blob: Blob) {
		const audioTranscriptionBody = new FormData();

		audioTranscriptionBody.append('file', blob, 'audio/mp3');
		audioTranscriptionBody.append('model', 'whisper-1');

		return audioTranscriptionBody;
	}

	async recordSoundInfra({ uint8Array }: RecordSoundInfraInput): Promise<RecordSoundInfraOutput> {
		const convertedBuffer = Buffer.from(uint8Array);
		const blob = new Blob([convertedBuffer], { type: 'audio/mp3' });

		const audioTranscriptionBody = this.generateAudiTranscriptionBody(blob);

		return await this.openai.executeAudio(audioTranscriptionBody);
	}
}
