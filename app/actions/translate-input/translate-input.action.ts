'use server';

import { redirect } from 'next/navigation';
import { handleTranslateInputUsecase } from '../../../features/translate-input';

export const translateInputAction = async (input: string) => {
	try {
		const handleUsecase = handleTranslateInputUsecase();

		if (!input) {
			throw new Error('Form input was not inserted correctly');
		}

		const handleTranslated = { input, languageInput: 'English', languageOutput: 'Spanish' };

		return await handleUsecase.handleTranslatedInput(handleTranslated);
	} catch (error: any) {
		redirect(`?error=${error.message}`);
	}
};
