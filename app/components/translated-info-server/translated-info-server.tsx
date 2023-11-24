import { translateEntryAction } from '@//actions/translate-entry/translate-entry.action';

interface TranslatedInfoServerProps {
	input: string;
}
export default async function TranslatedInfoServer({ input }: TranslatedInfoServerProps) {
	const entry = await translateEntryAction(input);

	return (
		<section className='flex flex-col w-full'>
			<article className='flex flex-col gap-2'>
				<header className='relative flex items-center p-2 gap-2'>
					<p className='z-10'>Definition</p>
					<span className='absolute bottom-3 w-20 h-2 bg-purple-200' />
				</header>
				<p>{entry?.hint}</p>
			</article>
		</section>
	);
}
