import { WordWithTranslations } from '../../../features/shared/types/word-translated';

export interface ProvideInfoActionInput {
	word: string;
	langInput: string;
	langOutput: string;
}

export interface ProvideInfoActionOutput {
	entryInput: WordWithTranslations;
	entryOutput: WordWithTranslations;
}

export interface HandleWordTranslatedInput {
	wordToFind?: string;
	wordOriginal: string;
	langInput: string;
	langOutput: string;
	inputStored: WordWithTranslations;
}
