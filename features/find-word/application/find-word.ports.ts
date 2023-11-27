import { WordWithTranslations } from '../../shared/types/word-translated';

export interface FindWordPorts {
	findWord(input: FindWordPortsTypes.FindWordInput): Promise<FindWordPortsTypes.FindWordOutput>;
}

export namespace FindWordPortsTypes {
	export interface FindWordInput {
		word: string;
		lang: string;
	}

	export type FindWordOutput = WordWithTranslations | null;
}
