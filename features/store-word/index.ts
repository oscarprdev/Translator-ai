import { db } from '../../lib/db';
import { DefaultZodValidation } from '../shared/validation/zod-validation';
import { StoreWordAdapter } from './adapters/store-word.adapter';
import { DefaultStoreWordUsecase } from './application/store-word.usecase';
import { DefaultStoreWordInfra } from './infra/store-word.infra';

const validation = new DefaultZodValidation();
const storeWordInfra = new DefaultStoreWordInfra(db);
const storeWordAdapter = new StoreWordAdapter(storeWordInfra, validation);
export const storeInfoUsecase = new DefaultStoreWordUsecase(storeWordAdapter);
