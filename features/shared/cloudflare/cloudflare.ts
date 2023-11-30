import dotenv from 'dotenv';

dotenv.config();

export class CloudflareClient {
	constructor() {}

	async execute(prompt: string) {
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

		const response = await fetch(`${process.env.CLOUNDLARE_ENDPOINT}`, {
			headers: { Authorization: `Bearer ${process.env.CLOUDFLARE_TOKEN}` },
			method: 'POST',
			body: JSON.stringify(input),
		});

		const result = await response.json();

		return result.result.response;
	}
}
