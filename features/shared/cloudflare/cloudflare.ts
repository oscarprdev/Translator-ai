import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

export class CloudflareClient {
	readonly llmEndpoint: string;
	readonly cloudflareToken: string;
	readonly openapiToken: string;

	constructor() {
		this.llmEndpoint = process.env.CLOUDFLARE_LLM_ENDPOINT || '';
		this.cloudflareToken = process.env.CLOUDFLARE_TOKEN || '';
		this.openapiToken = process.env.OPENAI_API_KEY || '';
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

		console.log(result);

		return result.result.response;
	}

	async executeAudio(uinArray: any) {
		try {
			const convertedBuffer = Buffer.from(uinArray);
			const blob = new Blob([convertedBuffer], { type: 'audio/mp3' });

			const formData = new FormData();
			formData.append('file', blob, 'audio/mp3');
			formData.append('model', 'whisper-1');

			const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
				headers: {
					Authorization: `Bearer ${this.openapiToken}`,
				},
				method: 'POST',
				body: formData,
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const result = await response.json();
		} catch (err) {
			console.error('Error:', err);
		}
	}
}
