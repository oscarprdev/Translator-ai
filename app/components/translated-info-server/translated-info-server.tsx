import { translateEntryAction } from '@//actions/translate-entry/translate-entry.action';

interface TranslatedInfoServerProps {
	input: string;
}
export default async function TranslatedInfoServer({ input }: TranslatedInfoServerProps) {
	const entry = await translateEntryAction(input);

	return (
		<section className='flex flex-col w-full'>
			<article className='flex flex-col gap-2 border-b border-zinc-200 p-2'>
				<header className='relative flex items-center p-2 gap-2'>
					<p className='z-10'>Definition</p>
					<span className='absolute bottom-3 w-20 h-2 bg-purple-200' />
				</header>
				<p>{entry?.definition}</p>
			</article>
			<article className='flex flex-col gap-2 border-b border-zinc-200 p-2'>
				<header className='relative flex items-center p-2 gap-2'>
					<p className='z-10'>Example</p>
					<span className='absolute bottom-3 w-20 h-2  bg-orange-200' />
				</header>
				<p>{entry?.example}</p>
			</article>
			<article className='flex flex-col gap-2 border-b border-zinc-200 p-2'>
				<header className='relative flex items-center p-2 gap-2'>
					<p className='z-10'>Hint</p>
					<span className='absolute bottom-3 w-10 h-2 bg-rose-200' />
				</header>
				<p>{entry?.hint}</p>
			</article>
			<article className='flex flex-col gap-2 border-b border-zinc-200 p-2'>
				<header className='relative flex items-center p-2 gap-2'>
					<p className='z-10'>Synonyms</p>
					<span className='absolute bottom-3 w-20 h-2 bg-cyan-200' />
				</header>
				<div className='flex items-center gap-2'>
					{entry.synonyms.map((syn) => (
						<p key={crypto.randomUUID().toString()}>{syn}</p>
					))}
				</div>
			</article>
			<article className='flex flex-col gap-2 border-b border-zinc-200 p-2'>
				<header className='relative flex items-center p-2 gap-2'>
					<p className='z-10'>Antonyms</p>
					<span className='absolute bottom-3 w-20 h-2 bg-pink-200' />
				</header>
				<div className='flex items-center gap-2'>
					{entry.antonyms.map((syn) => (
						<p key={crypto.randomUUID().toString()}>{syn}</p>
					))}
				</div>
			</article>
		</section>
	);
}
