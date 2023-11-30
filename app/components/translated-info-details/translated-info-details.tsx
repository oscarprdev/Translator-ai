import DetailsInfo from '../details-info/details-info';

interface TranslatedInfoDetailsProps {
	kind: string;
	phonetics: string[];
	definition: string;
	definitionTranslated: string;
	uses: string;
	usesTranslated: string;
	keyWord: string;
	keyWordTranslated: string;
}

export default function TranslatedInfoDetails(props: TranslatedInfoDetailsProps) {
	return (
		<>
			<article className='relative flex flex-col justify-center gap-2 pl-2 border-l-[3px] border-[var(--contrast-color)] h-24'>
				<p className='text-zinc-100'>Linguistics</p>
				<p className='text-zinc-400'>{props.kind}</p>
				<div className='flex items-center gap-2'>
					{props.phonetics.map((pho) => (
						<p
							key={crypto.randomUUID().toString()}
							className='text-zinc-400'>
							{pho}
						</p>
					))}
				</div>
			</article>
			<DetailsInfo
				title='Definition'
				content={props.definition}
				contentTranslated={props.definitionTranslated}
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
