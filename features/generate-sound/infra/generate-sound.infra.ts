import fs from 'fs';
import path from 'path';
import { OpenAiClient } from '../../shared/openai/openai';

export interface GenerateSoundInfra {
	generateSound(content: string): Promise<string>;
}

export class DefaultGenerateSoundInfra implements GenerateSoundInfra {
	constructor(private readonly clientAI: OpenAiClient) {}

	async generateSound(content: string): Promise<string> {
		const speechUrl = `speech-${crypto.randomUUID().toString()}.mp3`;
		const fileSrc = '/music/' + path.basename(speechUrl);
		const speechFile = path.resolve(`./public/music/${speechUrl}`);

		const mp3 = await this.clientAI.openai.audio.speech.create({
			model: 'tts-1',
			voice: 'alloy',
			input: content,
		});
		const buffer = Buffer.from(await mp3.arrayBuffer());

		await fs.promises.writeFile(speechFile, buffer);

		setTimeout(() => {
			fs.unlinkSync(speechFile);
		}, 1000);

		return fileSrc;
	}
}
