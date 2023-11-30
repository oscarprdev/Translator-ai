'use server';

import TransalatedInfoNav from '../translated-info-nav/translated-info-nav';
import TranslatedInfoDetails from '../translated-info-details/translated-info-details';
import { provideInfoAction } from '../../actions/provide-info/provide-info.action';
import TranslatedInfoSynAnt from '../translated-info-synant/translated-info-synant';
import TranslatedInfoExamples from '../translated-info-examples/translated-info-examples';

const TABS_LOCATIONS = {
	details: 'det',
	synonyms: 'syn',
	antonyms: 'ant',
	examples: 'ex',
};

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
			{info === TABS_LOCATIONS.details && (
				<TranslatedInfoDetails
					kind={`${entryInput.kind} - ${entryOutput.kind}`}
					phonetics={[...entryInput.phonetics, ...entryOutput.phonetics]}
					definition={entryInput.definition}
					definitionTranslated={entryOutput.definition}
					uses={entryInput.uses}
					usesTranslated={entryOutput.uses}
					keyWord={input}
					keyWordTranslated={entryOutput.word}
				/>
			)}
			{info === TABS_LOCATIONS.synonyms && (
				<TranslatedInfoSynAnt
					inputContent={entryInput.synonyms}
					outputContent={entryOutput.synonyms}
					langInput={langInput}
					langOutput={langOutput}
					kind={'synonyms'}
				/>
			)}
			{info === TABS_LOCATIONS.antonyms && (
				<TranslatedInfoSynAnt
					inputContent={entryInput.antonyms}
					outputContent={entryOutput.antonyms}
					langInput={langInput}
					langOutput={langOutput}
					kind={'antonyms'}
				/>
			)}
			{info === TABS_LOCATIONS.examples && (
				<TranslatedInfoExamples
					examples={entryInput.examples}
					examplesTranslated={entryOutput.examples}
					keyword={input}
					keyWordTranslated={entryOutput.word}
				/>
			)}
		</section>
	);
}
