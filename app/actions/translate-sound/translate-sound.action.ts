'use server';

import { generateSoundUsecase } from '../../../features/generate-sound';

export const translatedSoundAction = async (content: string) => {
	const { audioSrc } = await generateSoundUsecase.generateSound({ content });

	return audioSrc;
};
