import dotenv from 'dotenv';

dotenv.config();

export class CloudflareClient {
	readonly llmEndpoint: string;
	readonly cloudflareToken: string;

	constructor() {
		this.llmEndpoint = process.env.CLOUDFLARE_LLM_ENDPOINT || '';
		this.cloudflareToken = process.env.CLOUDFLARE_TOKEN || '';
	}

	async executePrompt(prompt: string) {
		const input = {
			messages: [
				{
					role: 'system',
					content: 'You are a professional english teacher',
				},
				{
					role: 'user',
					content: prompt,
				},
			],
		};

		const response = await fetch(this.llmEndpoint, {
			headers: { Authorization: `Bearer ${this.cloudflareToken}` },
			method: 'POST',
			body: JSON.stringify(input),
		});

		const result = await response.json();

		return result.result.response;
	}
}
