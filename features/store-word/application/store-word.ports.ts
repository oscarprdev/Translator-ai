import { WordWithTranslations } from '../../shared/types/word-translated';

export interface StoreWordPorts {
	storeWord(input: StoreWordPorts.StoreWordInput): Promise<StoreWordPorts.StoreWordOutput>;
}

export namespace StoreWordPorts {
	export interface StoreWordInput {
		data: Omit<WordWithTranslations, 'id'>;
	}

	export interface StoreWordOutput {
		data: WordWithTranslations;
	}
}
