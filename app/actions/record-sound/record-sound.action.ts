'use server';

import { recordSoundUsecase } from '../../../features/record-sound';

export const recordSound = async (langInput: string, uint8Array: Uint8Array) => {
	const { text } = await recordSoundUsecase().recordSound({ lang: langInput, uint8Array });

	return text.toLowerCase();
};
