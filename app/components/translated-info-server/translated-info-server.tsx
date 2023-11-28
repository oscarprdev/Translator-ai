// import { translateEntryAction } from '@//actions/translate-entry/translate-entry.action';
import TransalatedInfoNav from '../translated-info-nav/translated-info-nav';
import TranslatedInfoDetails from '../translated-info-details/translated-info-details';
import { provideInfoAction } from '../../actions/provide-info/provide-info.action';

interface TranslatedInfoServerProps {
	input: string;
	info: string;
}
export default async function TranslatedInfoServer({ input, info }: TranslatedInfoServerProps) {
	const { entryInput, entryOutput } = await provideInfoAction({ word: input, langInput: 'english', langOutput: 'spanish' });

	return (
		<section className='flex flex-col gap-10 w-full px-10 pb-10'>
			<TransalatedInfoNav />
			{info === 'det' && (
				<TranslatedInfoDetails
					definition={entryInput.definition}
					definitionTranslated={entryOutput.definition}
					examples={entryInput.examples}
					exampleTranslated={entryOutput.examples}
					uses={entryInput.uses}
					usesTranslated={entryOutput.uses}
					keyWord={input}
					keyWordTranslated={entryOutput.word}
				/>
			)}
			{info === 'syn' && (
				<article>
					<p></p>
				</article>
			)}
			{info === 'ant' && (
				<article>
					<p></p>
				</article>
			)}
		</section>
	);
}
