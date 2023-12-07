'use server';

import { translateInfoAction } from '../../actions/translate-input/translate-input.action';
import WordCard from '../word-card/word-card';

interface TranslateCardServerProps {
	input: string;
	langInput: string;
	langOutput: string;
}

export default async function TranslateCardServer({ input, langInput, langOutput }: TranslateCardServerProps) {
	const action = translateInfoAction();
	const inputObject = { word: input, langInput, langOutput };

	const entry = await action.execute(inputObject);

	return <WordCard content={entry.to} />;
}
