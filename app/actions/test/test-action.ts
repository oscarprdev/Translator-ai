'use server';

import { CloudflareClient } from '../../../features/shared/cloudflare/cloudflare';

export const sendToOpenAI = async (buffer: any) => {
	try {
		const cas = new CloudflareClient();

		await cas.executeAudio(buffer);
		// await cas.executePrompt('Say hello');
	} catch (error) {
		console.log(error);
	}
};
