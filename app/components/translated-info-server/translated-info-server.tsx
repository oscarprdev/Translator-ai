import { translateEntryAction } from '@//actions/translate-entry/translate-entry.action';
import TransalatedInfoNav from '../translated-info-nav/translated-info-nav';
import TranslatedInfoDetails from '../translated-info-details/translated-info-details';

interface TranslatedInfoServerProps {
	input: string;
	info: string;
}
export default async function TranslatedInfoServer({ input, info }: TranslatedInfoServerProps) {
	const entry = await translateEntryAction(input);

	return (
		<section className='flex flex-col gap-10 w-full px-10 pb-10'>
			<TransalatedInfoNav />
			{info === 'det' && (
				<TranslatedInfoDetails
					definition={entry.definition}
					example={entry.example}
					hint={entry.hint}
					keyWord={input}
				/>
			)}
			{info === 'onyms' && (
				<article>
					<p>{entry.synonyms}</p>
				</article>
			)}
			{info === 'alt' && (
				<article>
					<p>{entry.kind}</p>
				</article>
			)}
		</section>
	);
}
