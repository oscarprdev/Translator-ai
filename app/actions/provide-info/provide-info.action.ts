import { redirect } from 'next/navigation';
import { UsecaseOutputState } from '../../../features/shared/types/usecase-output-state';
import { FindWordUsecase } from '../../../features/find-word/application/find-word.usecase';
import { GenerateInfoUsecase } from '../../../features/generate-info/application/generate-info.usecase';
import { TranslateWordUsecase } from '../../../features/translate-word/application/translate-word.usecase';
import { StoreWordUsecase } from '../../../features/store-word/application/store-word.usecase';
import { WordWithTranslations } from '../../../features/shared/types/word-translated';
import { findWordUsecase } from '../../../features/find-word';
import { translateWordUsecase } from '../../../features/translate-word';
import { storeInfoUsecase } from '../../../features/store-word';
import { generateInfoUsecase } from '../../../features/generate-info';
import { Action } from '../common/action';
import { HandleWordTranslatedInput, ProvideInfoActionInput, ProvideInfoActionOutput } from './provide-info.types';

class ProvideInfoAction extends Action<ProvideInfoActionInput, ProvideInfoActionOutput> {
	constructor(
		protected readonly findWordUsecase: FindWordUsecase,
		private readonly generateInfoUsecase: GenerateInfoUsecase,
		protected readonly translateWordUsecase: TranslateWordUsecase,
		private readonly storeWordUsecase: StoreWordUsecase
	) {
		super(findWordUsecase, translateWordUsecase);
	}

	private async handleGenerateInfo(word: string, langInput: string, langOutput: string) {
		const generatedInfo = await this.generateInfoUsecase.generateInfo({
			input: word,
			langInput,
			langOutput,
		});

		if (generatedInfo.state === UsecaseOutputState.error) {
			throw new Error(`Error translating ${word} from ${langInput} to ${langOutput}: ${generatedInfo.error}`);
		}

		return generatedInfo.data;
	}

	private async handleStoreWord(data: Omit<WordWithTranslations, 'id'>) {
		const wordStored = await this.storeWordUsecase.storeWord({ data });

		if (wordStored.state === UsecaseOutputState.error) {
			throw new Error(`Error storing ${data.word} in database: ${wordStored.error}`);
		}

		return wordStored.data;
	}

	private async generateTranslatedNewWord(word: string, langInput: string, langOutput: string) {
		const wordTranslated = await this.handleTranslateWord(word, langInput, langOutput);
		const wordGenerated = await this.handleGenerateInfo(wordTranslated, langOutput, langInput);
		const outputWordStored = await this.handleStoreWord(wordGenerated);

		return outputWordStored;
	}

	private async generateNewWord(word: string, langInput: string, langOutput: string) {
		const wordGenerated = await this.handleGenerateInfo(word, langInput, langOutput);
		const outputWordStored = await this.handleStoreWord(wordGenerated);

		return outputWordStored;
	}

	private async handleWordTranslated({ wordToFind, wordOriginal, langInput, langOutput, inputStored }: HandleWordTranslatedInput) {
		if (wordToFind) {
			const outputWordAlreadyStored = await this.handleFindWordStored(wordToFind, langOutput);

			if (outputWordAlreadyStored) {
				return {
					entryInput: inputStored,
					entryOutput: outputWordAlreadyStored,
				};
			}
		}

		const newTranslatedWord = await this.generateTranslatedNewWord(wordOriginal, langInput, langOutput);

		return {
			entryInput: inputStored,
			entryOutput: newTranslatedWord,
		};
	}

	async execute({ word, langInput, langOutput }: ProvideInfoActionInput) {
		try {
			const inputWordAlreadyStored = await this.handleFindWordStored(word, langInput);

			if (inputWordAlreadyStored) {
				const wordToFind = inputWordAlreadyStored?.translations.find((translation) => translation.lang === langOutput)?.translation;

				return await this.handleWordTranslated({
					wordToFind,
					wordOriginal: word,
					langInput,
					langOutput,
					inputStored: inputWordAlreadyStored,
				});
			}

			const inputWordGenerated = await this.generateNewWord(word, langInput, langOutput);
			const outputWordAlreadyTranslated = inputWordGenerated.translations.find(
				(translation) => translation.lang === langOutput
			)?.translation;

			return await this.handleWordTranslated({
				wordToFind: outputWordAlreadyTranslated,
				wordOriginal: word,
				langInput,
				langOutput,
				inputStored: inputWordGenerated,
			});
		} catch (error: any) {
			redirect(`?error=${error.message}`);
		}
	}
}

export const provideInfoAction = () => new ProvideInfoAction(findWordUsecase, generateInfoUsecase, translateWordUsecase, storeInfoUsecase);
