'use server';

import { redirect } from 'next/navigation';
import { handleTranslateEntryUsecase } from '../../features/translate-entry';

export const translateEntryAction = async (state: any, formData: FormData) => {
	try {
		const input = formData.get('entry') as string;
		const handleUsecase = handleTranslateEntryUsecase();

		if (!input) {
			throw new Error('Form input was not inserted correctly');
		}

		const handleTranslated = { input, languageInput: 'English', languageOutput: 'Spanish' };

		return {
			entry: await handleUsecase.handleTranslatedInput(handleTranslated),
		};
	} catch (error: any) {
		redirect(`?error=${error.message}`);
	}
};
