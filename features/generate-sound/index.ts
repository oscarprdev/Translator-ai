import { OpenAiClient } from '../shared/openai/openai';
import { DefaultZodValidation } from '../shared/validation/zod-validation';
import { GenerateSoundAdapter } from './adapter/generate-sound.adapter';
import { DefaultGenerateSoundUsecase } from './application/generate-sound.use-case';
import { DefaultGenerateSoundInfra } from './infra/generate-sound.infra';

const validation = new DefaultZodValidation();
const clientAi = new OpenAiClient();

const generateSoundInfra = new DefaultGenerateSoundInfra(clientAi);
const generateSoundAdapter = new GenerateSoundAdapter(generateSoundInfra, validation);
export const generateSoundUsecase = new DefaultGenerateSoundUsecase(generateSoundAdapter);
