import { TranslatedEntry } from '@prisma/client';
import { ZodValidation } from '../../shared/validation/zod-validation';
import { FindWordPorts, FindWordPortsTypes } from '../application/find-word.ports';
import { FindWordInfra } from '../infra/find-word.infra';
import { findWordInputSchema, findWordOutputSchema } from './find-word.adapter.schemas';
import { Translation } from '../../shared/types/word-translated';

export class FindWordAdapter implements FindWordPorts {
	constructor(private readonly infra: FindWordInfra, private readonly zod: ZodValidation) {}

	private validateInput(input: FindWordPortsTypes.FindWordInput) {
		return this.zod.validate<FindWordPortsTypes.FindWordInput>(findWordInputSchema, input);
	}

	private validateOutput(entry: TranslatedEntry, translations: Translation[]) {
		const output = {
			...entry,
			translations,
		};

		return this.zod.validate<FindWordPortsTypes.FindWordOutput>(findWordOutputSchema, output);
	}

	async findWord({ word, lang }: FindWordPortsTypes.FindWordInput): Promise<FindWordPortsTypes.FindWordOutput> {
		const validInput = this.validateInput({ word, lang });

		const { entry, translations } = await this.infra.findWordFromDictionary(validInput);

		return entry && translations && this.validateOutput(entry, translations);
	}
}
