import { db } from '../../lib/db';
import { DefaultDescribeEntryInfra } from '../shared/infra/describe-entry.infra';
import { OpenAiClient } from '../shared/openai/openai';
import { DefaultZodValidation } from '../shared/validation/zod-validation';
import { DescribeTranslatedInputAdapter } from './adapters/describe-input/describe-input.adapter';
import { TranslateInputAdapter } from './adapters/translate-input/translate-input.adapter';
import { DefaultDescribeTranslatedInputUsecase } from './application/describe/describe-translated-input.usecase';
import { DefaultHandleTranslateInputUsecase } from './application/handle/handle-translate-Input.usecase';
import { DefaultTranslateInputUsecase } from './application/translate/translate-input.usecase';
import { DefaultTranslateInputInfra } from './infra/translate-input.infra';

const clientAi = new OpenAiClient();
const describeTranslatedInfra = new DefaultDescribeEntryInfra(db);

const client = new DefaultTranslateInputInfra(db, clientAi, describeTranslatedInfra);
const validation = new DefaultZodValidation();

const describeInputAdapter = new DescribeTranslatedInputAdapter(client, validation);
const translateInputAdapter = new TranslateInputAdapter(client, validation);

const describeInputUsecase = new DefaultDescribeTranslatedInputUsecase(describeInputAdapter);
const translateInputUsecase = new DefaultTranslateInputUsecase(translateInputAdapter);

export const handleTranslateInputUsecase = () => new DefaultHandleTranslateInputUsecase(describeInputUsecase, translateInputUsecase);
