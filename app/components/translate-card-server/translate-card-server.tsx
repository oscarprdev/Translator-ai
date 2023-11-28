'use server';

import { provideInfoAction } from '../../actions/translate-input/translate-input.action';

interface TranslateCardServerProps {
	input: string;
	langInput: string;
	langOutput: string;
}

export default async function TranslateCardServer({ input, langInput, langOutput }: TranslateCardServerProps) {
	const action = provideInfoAction();
	const inputObject = { word: input, langInput, langOutput };

	const entry = await action.execute(inputObject);

	return (
		<div className='relative grid place-items-center h-14 w-[60%] bg-[var(--bg-translated-card)]'>
			<span className='absolute top-0 left-0 h-full w-2 bg-[var(--contrast-color)]'></span>
			<p className='text-zinc-300 capitalize'>{entry.to}</p>
		</div>
	);
}
