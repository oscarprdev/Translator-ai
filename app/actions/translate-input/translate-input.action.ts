'use server';

import { redirect } from 'next/navigation';
import { UsecaseOutputState } from '../../../features/shared/types/usecase-output-state';
import { FindWordUsecase } from '../../../features/find-word/application/find-word.usecase';
import { TranslateWordUsecase } from '../../../features/translate-word/application/translate-word.usecase';
import { Action } from '../provide-info/provide-info.action';
import { findWordUsecase } from '../../../features/find-word';
import { translateWordUsecase } from '../../../features/translate-word';

interface TranslateInputActionInput {
	word: string;
	langInput: string;
	langOutput: string;
}

interface TranslateInputActionOutput {
	from: string;
	to: string;
}

class TranslateInputAction extends Action<TranslateInputActionInput, TranslateInputActionOutput> {
	constructor(private readonly findWordUsecase: FindWordUsecase, private readonly translateWordUsecase: TranslateWordUsecase) {
		super();
	}

	private async handleFindWordStored(word: string, lang: string) {
		const wordStored = await this.findWordUsecase.findWordStored({ word, lang });

		if (wordStored.state === UsecaseOutputState.error) {
			throw new Error(`Error retrieving ${word} from database: ${wordStored.error}`);
		}

		return wordStored.data;
	}

	private async handleTranslateWord(word: string, langInput: string, langOutput: string) {
		const wordTranslated = await this.translateWordUsecase.translateWord({ input: word, langInput, langOutput });

		if (wordTranslated.state === UsecaseOutputState.error) {
			throw new Error(`Error translating ${word} from ${langOutput} to ${langInput}: ${wordTranslated.error}`);
		}

		return wordTranslated.data.to;
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
