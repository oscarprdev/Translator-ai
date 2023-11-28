import { ZodValidation } from '../../shared/validation/zod-validation';
import { FindWordPorts, FindWordPortsTypes } from '../application/find-word.ports';
import { FindWordInfra } from '../infra/find-word.infra';
import { findWordInputSchema } from './find-word.adapter.schemas';

export class FindWordAdapter implements FindWordPorts {
	constructor(private readonly infra: FindWordInfra, private readonly zod: ZodValidation) {}

	private validateInput(input: FindWordPortsTypes.FindWordInput) {
		return this.zod.validate<FindWordPortsTypes.FindWordInput>(findWordInputSchema, input);
	}

	async findWord({ word, lang }: FindWordPortsTypes.FindWordInput): Promise<FindWordPortsTypes.FindWordOutput> {
		const validInput = this.validateInput({ word, lang });

		const { entry, translations } = await this.infra.findWordFromDictionary(validInput);

		return (
			entry &&
			translations && {
				...entry,
				translations,
			}
		);
	}
}
