import { TranslatedInput } from '../common/types';

export interface TranslateInputPorts {
	translateInput(input: TranslateInputPorts.TranslateInput): Promise<TranslateInputPorts.TranslateOutput>;
}

export namespace TranslateInputPorts {
	export interface TranslateInput {
		prompt: string;
	}

	export interface TranslateOutput {
		data: TranslatedInput;
	}
}
