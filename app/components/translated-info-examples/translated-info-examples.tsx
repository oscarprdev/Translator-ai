import DetailsInfo from '../details-info/details-info';

interface TranslatedInfoExamplesProps {
	examples: string[];
	examplesTranslated: string[];
	keyword: string;
	keyWordTranslated: string;
}

export default function TranslatedInfoExamples({ examples, examplesTranslated, keyword, keyWordTranslated }: TranslatedInfoExamplesProps) {
	return (
		<>
			{examples.map((example, i) => (
				<DetailsInfo
					key={i}
					title={`Example ${i + 1}`}
					content={example}
					contentTranslated={examplesTranslated[i]}
					keyWord={keyword}
					keyWordTranslated={keyWordTranslated}
				/>
			))}
		</>
	);
}
