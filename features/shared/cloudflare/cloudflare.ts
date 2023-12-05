import dotenv from 'dotenv';

dotenv.config();

export class CloudflareClient {
	constructor() {}

	async executeAudio(audio: string) {
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

		const response = await fetch(`${process.env.CLOUNDLARE_WHISPER_ENDPOINT}`, {
			headers: { Authorization: `Bearer ${process.env.CLOUDFLARE_TOKEN}` },
			method: 'POST',
			body: JSON.stringify(audio),
		});

		const result = await response.json();

		console.log(result);

		return result.result.response;
	}
}
