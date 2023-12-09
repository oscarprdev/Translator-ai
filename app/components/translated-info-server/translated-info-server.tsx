'use server';

import TranslatedInfoNav from '../translated-info-nav/translated-info-nav';
import TranslatedInfoDetails from '../translated-info-details/translated-info-details';
import TranslatedInfoSynAnt from '../translated-info-synant/translated-info-synant';
import TranslatedInfoExamples from '../translated-info-examples/translated-info-examples';
import { provideInfoAction } from '@//actions/provide-info/provide-info.action';

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
	const usecase = provideInfoAction();
	const inputObject = { word: input, langInput, langOutput };
	const { entryInput, entryOutput } = await usecase.execute(inputObject);

	return (
		<section className='flex flex-col gap-10 w-full px-10 pb-10'>
			<TranslatedInfoNav />
			{info === TABS_LOCATIONS.details && (
				<TranslatedInfoDetails
					kinds={[entryInput.kind, entryOutput.kind]}
					phonetics={entryInput.phonetics}
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
					langInput={langInput}
					keyword={input}
					keyWordTranslated={entryOutput.word}
					langOutput={langOutput}
				/>
			)}
		</section>
	);
}
