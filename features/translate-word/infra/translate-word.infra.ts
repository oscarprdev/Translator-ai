import { OpenAiClient } from '../../shared/openai/openai';
import { TranslateWordInfraTypes } from './models';

export interface TranslateWordInfra {
	translateWord(input: TranslateWordInfraTypes.Input): Promise<TranslateWordInfraTypes.Output>;
}

export class DefaultTranslateWordInfra implements TranslateWordInfra {
	constructor(private readonly clientAI: OpenAiClient) {}

	async translateWord({ prompt }: TranslateWordInfraTypes.Input): Promise<TranslateWordInfraTypes.Output> {
		console.log(prompt);
		return await this.clientAI.executePrompt<TranslateWordInfraTypes.Output>(prompt);
	}
}
