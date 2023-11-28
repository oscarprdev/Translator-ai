'use server';

import { redirect } from 'next/navigation';
import { provideTranslateWordUsecase } from '../../../features/translate-word';
import { UsecaseOutputState } from '../../../features/shared/types/usecase-output-state';
import { provideFindWordUsecase } from '../../../features/find-word';

export const translateInputAction = async (input: string) => {
	try {
		const translateWordUsecase = provideTranslateWordUsecase();
		const findWordUsecase = provideFindWordUsecase();

		const handleTranslated = { input, langInput: 'english', langOutput: 'spanish' };

		const wordAlreadyStored = await findWordUsecase.findWordStored({ word: input, lang: 'english' });

		if (wordAlreadyStored.state === UsecaseOutputState.error) {
			throw new Error(wordAlreadyStored.error || `Error finding word ${input} translated`);
		}

		const wordTranslated = wordAlreadyStored.data?.translations.find((translation) => translation.lang === 'spanish');

		if (wordTranslated) {
			return {
				from: input,
				to: wordTranslated.translation,
			};
		}

		const response = await translateWordUsecase.translateWord(handleTranslated);

		if (response.state === UsecaseOutputState.error) {
			throw new Error(response.error || `Error translating word ${input}`);
		}

		return {
			from: response.data.from,
			to: response.data.to,
		};
	} catch (error: any) {
		redirect(`?error=${error.message}`);
	}
};
