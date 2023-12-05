export interface GenerateSoundPorts {
	generateSound(input: GenerateSoundPortsTypes.GenerateSoundInput): Promise<GenerateSoundPortsTypes.GenerateSoundOutput>;
}

export namespace GenerateSoundPortsTypes {
	export interface GenerateSoundInput {
		content: string;
	}

	export interface GenerateSoundOutput {
		audioSrc: string;
	}
}
