import DetailsInfo from '../details-info/details-info';

interface TranslatedInfoDetailsProps {
	definition: string;
	definitionTranslated: string;
	examples: string[];
	exampleTranslated: string[];
	uses: string;
	usesTranslated: string;
	keyWord: string;
	keyWordTranslated: string;
}

export default function TranslatedInfoDetails(props: TranslatedInfoDetailsProps) {
	return (
		<>
			<DetailsInfo
				title='Definition'
				content={props.definition}
				contentTranslated={props.definitionTranslated}
				keyWord={props.keyWord}
				keyWordTranslated={props.keyWordTranslated}
			/>
			<DetailsInfo
				title='Example'
				content={props.examples[0]}
				contentTranslated={props.exampleTranslated[0]}
				keyWord={props.keyWord}
				keyWordTranslated={props.keyWordTranslated}
			/>
			<DetailsInfo
				title='Uses'
				content={props.uses}
				contentTranslated={props.usesTranslated}
				keyWord={props.keyWord}
				keyWordTranslated={props.keyWordTranslated}
			/>
		</>
	);
}
