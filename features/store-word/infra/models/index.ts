import { WordWithTranslations } from '../../../shared/types/word-translated';

export namespace StoreWordInfraTypes {
	export interface Input {
		data: Omit<WordWithTranslations, 'id'>;
	}

	export interface Output {
		data: WordWithTranslations;
	}
}
