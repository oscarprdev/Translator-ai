import { FindWordUsecase } from '../../../features/find-word/application/find-word.usecase';
import { UsecaseOutputState } from '../../../features/shared/types/usecase-output-state';
import { TranslateWordUsecase } from '../../../features/translate-word/application/translate-word.usecase';

export abstract class Action<I, O> {
	constructor(protected readonly findWordUsecase: FindWordUsecase, protected readonly translateWordUsecase: TranslateWordUsecase) {}

	abstract execute(input: I): Promise<O>;

	protected async handleFindWordStored(word: string, lang: string) {
		const wordStored = await this.findWordUsecase.findWordStored({ word, lang });

		if (wordStored.state === UsecaseOutputState.error) {
			throw new Error(`Error retrieving ${word} from database: ${wordStored.error}`);
		}

		return wordStored.data;
	}

	protected async handleTranslateWord(word: string, langInput: string, langOutput: string) {
		const wordTranslated = await this.translateWordUsecase.translateWord({ input: word, langInput, langOutput });

		if (wordTranslated.state === UsecaseOutputState.error) {
			throw new Error(`Error translating ${word} from ${langOutput} to ${langInput}: ${wordTranslated.error}`);
		}

		return wordTranslated.data.to;
	}
}
