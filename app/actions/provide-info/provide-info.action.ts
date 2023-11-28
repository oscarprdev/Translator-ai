import { redirect } from 'next/navigation';
import { provideFindWordUsecase } from '../../../features/find-word';
import { provideTranslateWordUsecase } from '../../../features/translate-word';
import { provideGenerateInfoUsecase } from '../../../features/generate-info';
import { provideStoreInfoUsecase } from '../../../features/store-word';
import { UsecaseOutputState } from '../../../features/shared/types/usecase-output-state';

interface ProvideInfoActionInput {
	word: string;
	langInput: string;
	langOutput: string;
}

export const provideInfoAction = async ({ word, langInput, langOutput }: ProvideInfoActionInput) => {
	try {
		const findWordUsecase = provideFindWordUsecase();
		const generateInfo = provideGenerateInfoUsecase();
		const translateWordUsecase = provideTranslateWordUsecase();
		const storeWordUsecase = provideStoreInfoUsecase();

		const inputWord = await findWordUsecase.findWordStored({ word, lang: langInput });

		if (inputWord.state === UsecaseOutputState.error) {
			throw new Error(inputWord.error || `Error retrieving ${word} from database`);
		}

		// If input word already exist on database
		if (inputWord.data) {
			const wordToFind = inputWord.data?.translations.find((translation) => translation.lang === langOutput)?.translation;

			// If word is already translated and stored in database
			if (wordToFind) {
				const outputWord = await findWordUsecase.findWordStored({ word: wordToFind, lang: langOutput });

				if (outputWord.state === UsecaseOutputState.error) {
					throw new Error(outputWord.error || `Error retrieving ${wordToFind} from database`);
				}

				// If output word already exist on database
				if (outputWord.data) {
					return {
						entryInput: inputWord.data,
						entryOutput: outputWord.data,
					};
				}
			}

			// Find translated word from input information
			const outputWordTranslated = await translateWordUsecase.translateWord({ input: word, langInput, langOutput });

			if (outputWordTranslated.state === UsecaseOutputState.error) {
				throw new Error(outputWordTranslated.error || `Error translating ${word} from ${langOutput} to ${langInput}`);
			}

			// Generate info of output word
			const outputWord = await generateInfo.generateInfo({
				input: outputWordTranslated.data.to,
				langInput: langOutput,
				langOutput: langInput,
			});

			if (outputWord.state === UsecaseOutputState.error) {
				throw new Error(outputWord.error || `Error translating ${word} from ${langInput} to ${langOutput}`);
			}

			// Store output word info in database
			const outputWordStored = await storeWordUsecase.storeWord({ data: outputWord.data });

			if (outputWordStored.state === UsecaseOutputState.error) {
				throw new Error(`Error storing ${word} in database`);
			}

			// Return input and output information successfully stored in database
			return {
				entryInput: inputWord.data,
				entryOutput: outputWordStored.data,
			};
		}

		// Generate input info word
		const inputWordGenerated = await generateInfo.generateInfo({ input: word, langInput, langOutput });

		if (inputWordGenerated.state === UsecaseOutputState.error) {
			throw new Error(inputWordGenerated.error || `Error translating ${word} from ${langInput} to ${langOutput}`);
		}

		// Store input info word in database
		const inputWordStored = await storeWordUsecase.storeWord({ data: inputWordGenerated.data });

		if (inputWordStored.state === UsecaseOutputState.error) {
			throw new Error(`Error storing ${word} in database`);
		}

		// Find word translated
		const outputWordAlreadyTranslated = inputWordStored.data.translations.find(
			(translation) => translation.lang === langOutput
		)?.translation;

		if (outputWordAlreadyTranslated) {
			// Generate output info word
			const outputWordTranslated = await findWordUsecase.findWordStored({ word: outputWordAlreadyTranslated, lang: langOutput });

			if (outputWordTranslated.state === UsecaseOutputState.error) {
				throw new Error(outputWordTranslated.error || `Error retrieving ${outputWordAlreadyTranslated} from database`);
			}

			// If output word already exist on database
			if (outputWordTranslated.data) {
				return {
					entryInput: inputWordStored.data,
					entryOutput: outputWordTranslated.data,
				};
			}
		}

		const outputWordTranslated = await translateWordUsecase.translateWord({ input: word, langInput, langOutput });

		if (outputWordTranslated.state === UsecaseOutputState.error) {
			throw new Error(outputWordTranslated.error || `Error translating ${word} from ${langOutput} to ${langInput}`);
		}

		const outputWordGenerated = await generateInfo.generateInfo({
			input: outputWordTranslated.data.to,
			langInput: langOutput,
			langOutput: langInput,
		});

		if (outputWordGenerated.state === UsecaseOutputState.error) {
			throw new Error(outputWordGenerated.error || `Error translating ${word} from ${langOutput} to ${langInput}`);
		}

		// Store output info word in database
		const outputWordStored = await storeWordUsecase.storeWord({ data: outputWordGenerated.data });

		if (outputWordStored.state === UsecaseOutputState.error) {
			throw new Error(`Error storing ${word} in database`);
		}

		// Return both input and output successfully generated and stored in database
		return {
			entryInput: inputWordStored.data,
			entryOutput: outputWordStored.data,
		};
	} catch (error: any) {
		redirect(`?error=${error.message}`);
	}
};
