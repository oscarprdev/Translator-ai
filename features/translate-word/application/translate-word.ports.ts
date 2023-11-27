export interface TranslateWordPorts {
	translateWord(input: TranslateWordPorts.Input): Promise<TranslateWordPorts.Output>;
}

export namespace TranslateWordPorts {
	export interface Input {
		prompt: string;
	}

	export interface Output {
		from: string;
		to: string;
	}
}
