export interface RecordSoundPorts {
	recordSound(input: RecordSoundPortsTypes.RecordSoundInput): Promise<RecordSoundPortsTypes.RecordSoundOutput>;
}

export namespace RecordSoundPortsTypes {
	export interface RecordSoundInput {
		uint8Array: Uint8Array;
	}

	export interface RecordSoundOutput {
		text: string;
	}
}
