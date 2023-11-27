'use server';

export default async function TranslateCardServer({ input }: { input: string }) {
	// const entry = await translateInputAction(input);

	return (
		<div className='relative grid place-items-center h-14 w-[60%] bg-[var(--bg-translated-card)]'>
			<span className='absolute top-0 left-0 h-full w-2 bg-[var(--contrast-color)]'></span>
			{/* <p className='text-zinc-300 capitalize'>{entry.translated}</p> */}
		</div>
	);
}
