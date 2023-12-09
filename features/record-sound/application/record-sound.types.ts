export namespace RecordSoundUsecaseTypes {
	export interface RecordSoundInput {
		lang: string;
		uint8Array: Uint8Array;
	}

	export interface RecordSoundOutput {
		text: string;
	}

	export interface LanguagesMap {
		english: string;
		spanish: string;
		german: string;
		italian: string;
	}
}
