import ContentCard from '../content-card/content-card';
import DetailsInfo from '../details-info/details-info';

interface TranslatedInfoExamplesProps {
	examples: string[];
	examplesTranslated: string[];
	langInput: string;
	keyword: string;
	keyWordTranslated: string;
	langOutput: string;
}

export default function TranslatedInfoExamples({
	examples,
	examplesTranslated,
	langInput,
	keyword,
	keyWordTranslated,
	langOutput,
}: TranslatedInfoExamplesProps) {
	return (
		<>
			<div className='flex flex-col gap-2 border-l-[3px] pl-2 border-[var(--contrast-color)]'>
				<p className='text-zinc-100'>Examples in {langInput}</p>
				{examples.map((example, i) => (
					<ContentCard
						key={i}
						content={example}
						keyWord={keyword}
					/>
				))}
			</div>
			<div className='flex flex-col gap-2 border-l-[3px] pl-2 border-[var(--contrast-color)]'>
				<p className='text-zinc-100'>Examples in {langOutput}</p>
				{examplesTranslated.map((example, i) => (
					<ContentCard
						key={i}
						content={example}
						keyWord={keyWordTranslated}
					/>
				))}
			</div>
		</>
	);
}
