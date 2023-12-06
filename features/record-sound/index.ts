import { OpenAiClient } from '../shared/openai/openai';
import { DefaultZodValidation } from '../shared/validation/zod-validation';
import { RecordSoundAdapter } from './adapters/record-sound.adapter';
import { DefaultRecordSoundUsecase } from './application/record-sound.usecase';
import { DefaultRecordSoundInfra } from './infra/record-sound.infra';

const validation = new DefaultZodValidation();
const clientAi = new OpenAiClient();

const recordSoundInfra = new DefaultRecordSoundInfra(clientAi);
const recordSoundAdapter = new RecordSoundAdapter(recordSoundInfra, validation);
export const recordSoundUsecase = () => new DefaultRecordSoundUsecase(recordSoundAdapter);
