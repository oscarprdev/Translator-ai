import { WordWithTranslations } from '../../../shared/types/word-translated';

export namespace GenerateInfoInfraTypes {
	export type Output = Omit<WordWithTranslations, 'id'>;
}
