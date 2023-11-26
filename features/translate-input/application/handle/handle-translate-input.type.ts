export namespace HandleTranslatedInputTypes {
	export interface HandleTranslateInput {
		input: string;
		languageInput: string;
		languageOutput: string;
	}

	export interface HandleTranslateOutput {
		original: string;
		translated: string;
	}
}
