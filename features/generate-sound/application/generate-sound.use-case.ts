import { GenerateSoundPorts } from './generate-sound.ports';
import { GenerateSoundTypes } from './generate-sound.types';

export interface GenerateSoundUsecase {
	generateSound(input: GenerateSoundTypes.GenerateSoundInput): Promise<GenerateSoundTypes.GenerateSoundOutput>;
}

export class DefaultGenerateSoundUsecase implements GenerateSoundUsecase {
	constructor(private readonly ports: GenerateSoundPorts) {}

	async generateSound({ content }: GenerateSoundTypes.GenerateSoundInput) {
		return await this.ports.generateSound({ content });
	}
}
