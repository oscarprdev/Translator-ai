import { RecordSoundPorts } from './record-sound.ports';
import { RecordSoundUsecaseTypes } from './record-sound.types';

export interface RecordSoundUsecase {
	recordSound(input: RecordSoundUsecaseTypes.RecordSoundInput): Promise<RecordSoundUsecaseTypes.RecordSoundOutput>;
}

export class DefaultRecordSoundUsecase implements RecordSoundUsecase {
	constructor(private readonly ports: RecordSoundPorts) {}

	private mapLanguage(lang: string) {
		const languagesMap: RecordSoundUsecaseTypes.LanguagesMap = {
			english: 'en',
			spanish: 'es',
			german: 'de',
			italian: 'it',
		};

		return languagesMap[lang as keyof RecordSoundUsecaseTypes.LanguagesMap];
	}

	async recordSound({ lang, uint8Array }: RecordSoundUsecaseTypes.RecordSoundInput): Promise<RecordSoundUsecaseTypes.RecordSoundOutput> {
		const langMapped = this.mapLanguage(lang);
		const { text } = await this.ports.recordSound({ lang: langMapped, uint8Array });

		return { text };
	}
}
