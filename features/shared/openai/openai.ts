import OpenAI from 'openai';
import { config } from 'dotenv';

config();

export class OpenAiClient {
	readonly openai: OpenAI;
	readonly openApiKey?: string = process.env.OPEN_API_KEY;
	readonly model: string = 'gpt-4-1106-preview';
	readonly role: string =
		'You are an professional philologist with vast experience in english, spanish, german, italian, japanish, chinise languagaes.';

	constructor() {
		this.openai = new OpenAI({ apiKey: this.openApiKey });
	}

	async execute<T>(prompt: string) {
		try {
			const completion = await this.openai.chat.completions.create({
				messages: [
					{ role: 'system', content: this.role },
					{
						role: 'user',
						content: prompt,
					},
				],
				model: this.model,
				response_format: { type: 'json_object' },
			});

			const content = completion.choices[0].message.content;

			if (content && typeof content === 'string') {
				const { data } = JSON.parse(content);

				if (!data) {
					throw new Error('OpenAi request response is empty');
				}

				return data as T;
			}

			throw new Error('OpenAi request has failed');
		} catch (error: any) {
			throw new Error(error);
		}
	}
}
