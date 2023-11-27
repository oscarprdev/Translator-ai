import { WordWithTranslations } from '../../shared/types/word-translated';

export interface GenerateInfoPorts {
	generateInfo(input: GenerateInfoPorts.Input): Promise<GenerateInfoPorts.Output>;
}

export namespace GenerateInfoPorts {
	export interface Input {
		prompt: string;
	}

	export type Output = Omit<WordWithTranslations, 'id'>;
}
