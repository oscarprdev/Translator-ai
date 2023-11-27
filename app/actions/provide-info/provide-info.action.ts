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
		if (inputWord) {
			const wordToFind = inputWord.data?.translations.find((translation) => translation.language === langOutput)?.translation;

			// If word is already translated and stored in database
			if (wordToFind) {
				const outputWord = await findWordUsecase.findWordStored({ word: wordToFind, lang: langOutput });

				if (outputWord.state === UsecaseOutputState.error) {
					throw new Error(outputWord.error || `Error retrieving ${wordToFind} from database`);
				}

				// If output word already exist on database
				if (outputWord.data) {
					console.log(inputWord, outputWord, 'first return ');
					return {
						entryInput: inputWord,
						entryOutput: outputWord,
					};
				}
			}

			// Find translated word from input information
			const outputWordTranslated = await translateWordUsecase.translateWord({ input: word, langInput: langOutput, langOutput: langInput });

			if (outputWordTranslated.state === UsecaseOutputState.error) {
				throw new Error(outputWordTranslated.error || `Error translating ${word} from ${langOutput} to ${langInput}`);
			}

			// Generate info of output word
			const outputWord = await generateInfo.generateInfo({ input: outputWordTranslated.data.from, langInput, langOutput });

			if (outputWord.state === UsecaseOutputState.error) {
				throw new Error(outputWord.error || `Error translating ${word} from ${langInput} to ${langOutput}`);
			}

			// Store output word info in database
			const outputWordStored = await storeWordUsecase.storeWord({ data: outputWord.data });

			if (!outputWordStored) {
				throw new Error(`Error storing ${word} in database`);
			}

			console.log(inputWord, outputWordStored, 'second return');

			// Return input and output information successfully stored in database
			return {
				entryInput: inputWord,
				entryOutput: outputWordStored,
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
		const outputWordTranslated = inputWordStored.data.translations.find((translation) => translation.language === langOutput)?.translation;

		if (outputWordTranslated) {
			// Generate output info word
			const outputWordGenerated = await generateInfo.generateInfo({
				input: outputWordTranslated,
				langInput: langOutput,
				langOutput: langInput,
			});

			if (outputWordGenerated.state === UsecaseOutputState.error) {
				throw new Error(outputWordGenerated.error || `Error translating ${word} from ${langOutput} to ${langInput}`);
			}

			// Store output info word in database
			const outputWordStored = await storeWordUsecase.storeWord({ data: outputWordGenerated.data });

			if (!outputWordStored) {
				throw new Error(`Error storing ${word} in database`);
			}

			console.log(inputWordStored, outputWordStored, 'third return');

			// Return both input and output successfully generated and stored in database
			return {
				entryInput: inputWordStored,
				entryOutput: outputWordStored,
			};
		}

		console.log('undefined');
	} catch (error: any) {
		redirect(`?error=${error.message}`);
	}
};
