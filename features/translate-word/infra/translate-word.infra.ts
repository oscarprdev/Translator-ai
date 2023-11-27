import { OpenAiClient } from '../../shared/openai/openai';
import { TranslateWordInfraTypes } from './models';

export interface TranslateWordInfra {
	translateWord(input: TranslateWordInfraTypes.Input): Promise<TranslateWordInfraTypes.Output>;
}

export class DefaultTranslateWordInfra implements TranslateWordInfra {
	constructor(private readonly openaiClient: OpenAiClient) {}

	async translateWord({ prompt }: TranslateWordInfraTypes.Input): Promise<TranslateWordInfraTypes.Output> {
		return await this.openaiClient.execute<TranslateWordInfraTypes.Output>(prompt);
	}
}
