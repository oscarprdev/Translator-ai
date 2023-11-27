import { OpenAiClient } from '../shared/openai/openai';
import { DefaultZodValidation } from '../shared/validation/zod-validation';
import { GenerateInfoAdapter } from './adapters/generate-info.adapter';
import { DefaultGenerateInfoUsecase } from './application/generate-info.usecase';
import { DefaultGenerateInfoInfra } from './infra/generate-info.infra';

const validation = new DefaultZodValidation();
const clientAi = new OpenAiClient();

const generateInfoInfra = new DefaultGenerateInfoInfra(clientAi);
const generateInfoAdapter = new GenerateInfoAdapter(generateInfoInfra, validation);

export const provideGenerateInfoUsecase = () => new DefaultGenerateInfoUsecase(generateInfoAdapter);
