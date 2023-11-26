import { db } from '../../lib/db';
import { OpenAiClient } from '../shared/openai/openai';
import { DefaultZodValidation } from '../shared/validation/zod-validation';
import { StoreTranslatedEntryAdapter } from './adapters/store/store-translated-entry.adapter';
import { DescribeTranslatedEntryAdapter } from './adapters/describe/describe-translated-entry.adapter';
import { TranslateEntryAdapter } from './adapters/translate/translate-entry.adapter';
import { DefaultStoreTranslatedEntryUsecase } from './application/store/store-translated-entry.usecase';
import { DefaultDescribeTranslatedEntryUsecase } from './application/describe/describe-translated-entry.usecase';
import { DefaultTranslateEntryUsecase } from './application/translate/translate-entry.usecase';
import { DefaultTranslateEntryInfra } from './infra/translate-entry.infra';
import { DefaultHandleTranslateEntryUsecase } from './application/handle/handle-translate-entry.usecase';
import { DefaultDescribeEntryInfra } from '../shared/infra/describe-entry.infra';

const clientAi = new OpenAiClient();
const describeTranslatedInfra = new DefaultDescribeEntryInfra(db);
const client = new DefaultTranslateEntryInfra(db, clientAi, describeTranslatedInfra);
const validation = new DefaultZodValidation();

const describeAdapter = new DescribeTranslatedEntryAdapter(client, validation);
const storeAdapter = new StoreTranslatedEntryAdapter(client, validation);
const translateAdapter = new TranslateEntryAdapter(client, validation);

const describeUsecase = new DefaultDescribeTranslatedEntryUsecase(describeAdapter);
const storeUsecase = new DefaultStoreTranslatedEntryUsecase(storeAdapter);
const translateUsecase = new DefaultTranslateEntryUsecase(translateAdapter);

export const handleTranslateEntryUsecase = () => new DefaultHandleTranslateEntryUsecase(describeUsecase, storeUsecase, translateUsecase);
