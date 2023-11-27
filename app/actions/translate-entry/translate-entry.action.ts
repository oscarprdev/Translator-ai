// 'use server';

// import { redirect } from 'next/navigation';
// // import { handleTranslateEntryUsecase } from '../../../features/translate-entry';

// export const translateEntryAction = async (input: string) => {
// 	try {
// 		// const handleUsecase = handleTranslateEntryUsecase();

// 		if (!input) {
// 			throw new Error('Form input was not inserted correctly');
// 		}

// 		const handleTranslated = { input, langInput: 'english', langOutput: 'spanish' };

// 		return await handleUsecase.handleTranslatedEntry(handleTranslated);
// 	} catch (error: any) {
// 		redirect(`?error=${error.message}`);
// 	}
// };
