'use server';

import { redirect } from 'next/navigation';
import { FindWordUsecase } from '../../../features/find-word/application/find-word.usecase';
import { TranslateWordUsecase } from '../../../features/translate-word/application/translate-word.usecase';
import { findWordUsecase } from '../../../features/find-word';
import { translateWordUsecase } from '../../../features/translate-word';
import { Action } from '../common/action';
import { TranslateInputActionInput, TranslateInputActionOutput } from './translate-input.types';

class TranslateInputAction extends Action<TranslateInputActionInput, TranslateInputActionOutput> {
	constructor(protected readonly findWordUsecase: FindWordUsecase, protected readonly translateWordUsecase: TranslateWordUsecase) {
		super(findWordUsecase, translateWordUsecase);
	}

	async execute({ word, langInput, langOutput }: TranslateInputActionInput) {
		try {
			const wordAlreadyStored = await this.handleFindWordStored(word, langInput);
			const wordTranslated = wordAlreadyStored?.translations.find((translation) => translation.lang === langOutput);

			if (wordTranslated && wordAlreadyStored) {
				return {
					from: wordAlreadyStored?.word,
					to: wordTranslated.translation,
				};
			}

			const translatedWord = await this.handleTranslateWord(word, langInput, langOutput);

			return {
				from: word,
				to: translatedWord,
			};
		} catch (error: any) {
			redirect(`?error=${error.message}`);
		}
	}
}

export const provideInfoAction = () => new TranslateInputAction(findWordUsecase, translateWordUsecase);
