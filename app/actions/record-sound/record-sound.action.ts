'use server';

import { recordSoundUsecase } from '../../../features/record-sound';

export const recordSound = async (uint8Array: Uint8Array) => {
	const { text } = await recordSoundUsecase().recordSound({ uint8Array });

	return text.toLowerCase();
};
