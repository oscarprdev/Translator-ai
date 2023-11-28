// import { translateEntryAction } from '@//actions/translate-entry/translate-entry.action';
import TransalatedInfoNav from '../translated-info-nav/translated-info-nav';
import TranslatedInfoDetails from '../translated-info-details/translated-info-details';
import { provideInfoAction } from '../../actions/provide-info/provide-info.action';
import Link from 'next/link';
import TranslatedInfoSynAnt from '../translated-info-synant/translated-info-synant';

interface TranslatedInfoServerProps {
	input: string;
	langInput: string;
	langOutput: string;
	info: string;
}
export default async function TranslatedInfoServer({ input, langInput, langOutput, info }: TranslatedInfoServerProps) {
	const action = provideInfoAction();
	const inputObject = { word: input, langInput, langOutput };

	const { entryInput, entryOutput } = await action.execute(inputObject);

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
				<TranslatedInfoSynAnt
					inputContent={entryInput.synonyms}
					outputContent={entryOutput.synonyms}
					langInput={langInput}
					langOutput={langOutput}
					kind={'synonyms'}
				/>
			)}
			{info === 'ant' && (
				<TranslatedInfoSynAnt
					inputContent={entryInput.antonyms}
					outputContent={entryOutput.antonyms}
					langInput={langInput}
					langOutput={langOutput}
					kind={'antonyms'}
				/>
			)}
		</section>
	);
}
