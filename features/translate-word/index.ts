import { OpenAiClient } from '../shared/openai/openai';
import { DefaultZodValidation } from '../shared/validation/zod-validation';
import { TranslateWordAdapter } from './adapters/translate-word.adapter';
import { DefaultTranslateWordUsecase } from './application/translate-word.usecase';
import { DefaultTranslateWordInfra } from './infra/translate-word.infra';

const validation = new DefaultZodValidation();
const clientAi = new OpenAiClient();

const translateWordInfra = new DefaultTranslateWordInfra(clientAi);
const translateWordAdapter = new TranslateWordAdapter(translateWordInfra, validation);

export const provideTranslateWordUsecase = () => new DefaultTranslateWordUsecase(translateWordAdapter);
