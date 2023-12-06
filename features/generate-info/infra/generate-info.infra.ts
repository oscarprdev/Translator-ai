import { CloudflareClient } from '../../shared/cloudflare/cloudflare';
import { OpenAiClient } from '../../shared/openai/openai';
import { GenerateInfoInfraTypes } from './models';

export interface GenerateInfoInfra {
	generateInfo(prompt: string): Promise<GenerateInfoInfraTypes.Output>;
}

export class DefaultGenerateInfoInfra implements GenerateInfoInfra {
	constructor(private readonly clientAI: OpenAiClient) {}

	async generateInfo(prompt: string): Promise<GenerateInfoInfraTypes.Output> {
		return await this.clientAI.executePrompt<GenerateInfoInfraTypes.Output>(prompt);
	}
}
