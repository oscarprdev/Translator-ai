import OpenAI from 'openai';

export class OpenAiClient {
	readonly openai: OpenAI;
	readonly openApiKey: string = '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';
	readonly model: string = 'gpt-4-1106-preview';
	readonly role: string = 'You are an english teacher.';

	constructor() {
		this.openai = new OpenAI({ apiKey: this.openApiKey });
	}

	config(prompt: string) {
		return {
			messages: [
				{ role: 'system', content: 'You are an english teacher.' },
				{
					role: 'user',
					content: prompt,
				},
			],
			model: 'gpt-4-1106-preview',
			response_format: { type: 'json_object' },
		};
	}
}
