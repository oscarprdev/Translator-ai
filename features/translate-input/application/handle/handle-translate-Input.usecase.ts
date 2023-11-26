import { UsecaseOutputState } from '../../../shared/types/usecase-output-state';
import { HandleTranslatedInputTypes } from './handle-translate-input.type';
import { TranslateInputUsecase } from '../../../translate-input/application/translate/translate-input.usecase';
import { DescribeTranslatedInputUsecase } from '../describe/describe-translated-input.usecase';
import { TranslatedInput } from '../common/types';

export interface HandleTranslateInputUsecase {
	handleTranslatedInput(input: HandleTranslatedInputTypes.HandleTranslateInput): Promise<TranslatedInput>;
}

export class DefaultHandleTranslateInputUsecase implements HandleTranslateInputUsecase {
	constructor(
		private readonly describeUsecase: DescribeTranslatedInputUsecase,
		private readonly translateInputUsecase: TranslateInputUsecase
	) {}

	private async findStoredInput(input: string) {
		const describeUsecaseResponse = await this.describeUsecase.findStoredInput({
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
		const translateInputUsecaseResponse = await this.translateInputUsecase.translateInput({ input, languageInput, languageOutput });

		if (translateInputUsecaseResponse.state === UsecaseOutputState.success) {
			return translateInputUsecaseResponse.data;
		}

		throw new Error(translateInputUsecaseResponse.error);
	}

	/**
	 * Handles translated input by first attempting to find an entry already stored in the database.
	 * If the input is found, the stored information is returned.
	 * If not found, the input is translated.
	 */
	async handleTranslatedInput({
		input,
		languageInput,
		languageOutput,
	}: HandleTranslatedInputTypes.HandleTranslateInput): Promise<TranslatedInput> {
		const describeUsecaseResponse = await this.findStoredInput(input);

		if (describeUsecaseResponse?.original && describeUsecaseResponse?.translated) {
			return {
				original: describeUsecaseResponse.original,
				translated: describeUsecaseResponse.translated,
			};
		}

		const response = await this.translateInput(input, languageInput, languageOutput);

		return response;
	}
}
