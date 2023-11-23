import { TranslatedEntry } from '@prisma/client';
import { UsecaseOutputState } from '../../../shared/types/usecase-output-state';
import { StoreTranslatedEntryUsecase } from '../store/store-translated-entry.usecase';
import { DescribeTranslatedEntryUsecase } from '../describe/describe-translated-entry.usecase';
import { TranslateEntryUsecase } from '../translate/translate-entry.usecase';
import { HandleTranslatedEntryTypes } from './handle-translate-entry.type';

export interface HandleTranslateEntryUsecase {
	handleTranslatedInput(input: HandleTranslatedEntryTypes.HandleTranslateInput): Promise<TranslatedEntry>;
}

export class DefaultHandleTranslateEntryUsecase implements HandleTranslateEntryUsecase {
	constructor(
		private readonly describeUsecase: DescribeTranslatedEntryUsecase,
		private readonly storeUsecase: StoreTranslatedEntryUsecase,
		private readonly translateUsecase: TranslateEntryUsecase
	) {}

	private async findStoredEntry(input: string) {
		const describeUsecaseResponse = await this.describeUsecase.findStoredEntry({
			original: input,
		});

		if (describeUsecaseResponse.state === UsecaseOutputState.success) {
			return describeUsecaseResponse.data;
		}

		if (describeUsecaseResponse.state === UsecaseOutputState.error) {
			throw new Error(describeUsecaseResponse.error);
		}

		return null;
	}

	private async translateInput(input: string, languageInput: string, languageOutput: string) {
		const translateUsecaseResponse = await this.translateUsecase.translateEntry({ input, languageInput, languageOutput });

		if (translateUsecaseResponse.state === UsecaseOutputState.success) {
			return translateUsecaseResponse.data;
		}

		throw new Error(translateUsecaseResponse.error);
	}

	private async storeTranslatedEntry(translatedEntry: Omit<TranslatedEntry, 'id'>) {
		const storedTranslatesEntry = await this.storeUsecase.storeTranslatedEntry({ data: translatedEntry });

		if (storedTranslatesEntry.state === UsecaseOutputState.success) {
			return storedTranslatesEntry.data;
		}

		throw new Error(storedTranslatesEntry.error);
	}

	/**
	 * Handles translated input by first attempting to find an entry already stored in the database.
	 * If the input is found, the stored information is returned.
	 * If not found, the input is translated, stored in the database, and the stored information is returned.
	 */
	async handleTranslatedInput({
		input,
		languageInput,
		languageOutput,
	}: HandleTranslatedEntryTypes.HandleTranslateInput): Promise<TranslatedEntry> {
		const describeUsecaseResponse = await this.findStoredEntry(input);

		if (describeUsecaseResponse) {
			return describeUsecaseResponse;
		}

		const translatedEntry = await this.translateInput(input, languageInput, languageOutput);

		return await this.storeTranslatedEntry(translatedEntry);
	}
}
