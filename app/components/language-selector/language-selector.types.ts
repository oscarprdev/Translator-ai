export interface LanguagesParams {
	langInput: string;
	langOutput: string;
}

export enum LangParams {
	input = 'langInput',
	output = 'langOutput',
}

export interface DefaultLanguages {
	langInput: string[];
	langOutput: string[];
}
