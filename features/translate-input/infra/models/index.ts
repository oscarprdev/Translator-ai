export namespace TranslateInputInfraTypes {
	export interface DescribeInput {
		word: string;
		langInput: string;
		langOutput: string;
	}

	export interface DescribeResponse {
		original: string | null;
		translated: string | null;
	}

	export interface TranslateResponse {
		original: string;
		translated: string;
	}
}
