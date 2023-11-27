import { db } from '../../lib/db';
import { DefaultZodValidation } from '../shared/validation/zod-validation';
import { FindWordAdapter } from './adapters/find-word.adapter';
import { DefaultFindWordUsecase } from './application/find-word.usecase';
import { DefaultFindWordInfra } from './infra/find-word.infra';

const validation = new DefaultZodValidation();
const findWordInfra = new DefaultFindWordInfra(db);
const findWordAdapter = new FindWordAdapter(findWordInfra, validation);

export const provideFindWordUsecase = () => new DefaultFindWordUsecase(findWordAdapter);
