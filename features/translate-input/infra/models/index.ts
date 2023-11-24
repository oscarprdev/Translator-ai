import { TranslatedEntry } from '@prisma/client';

export namespace TranslateInputInfraTypes {
	export interface DescribeInput {
		original: string;
	}

	export interface DescribeResponse {
		data: TranslateResponse | null;
	}

	export interface TranslateResponse {
		original: string;
		translated: string;
	}
}
