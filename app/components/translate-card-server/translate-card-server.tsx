'use server';

import { translateInputAction } from '@//actions/translate-input/translate-input.action';

export default async function TranslateCardServer({ input }: { input: string }) {
	const entry = await translateInputAction(input);

	return (
		<div className='w-full h-full'>
			<textarea
				value={entry.translated}
				className='h-full p-2 outline-none resize-none w-full overflow-hidden border border-zinc-200'
			/>
		</div>
	);
}
