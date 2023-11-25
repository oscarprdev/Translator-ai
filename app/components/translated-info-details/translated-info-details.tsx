interface TranslatedInfoDetailsProps {
	definition: string;
	example: string[];
	hint: string;
	keyWord: string;
}

interface DetailsArticleProps {
	title: string;
	content: string;
	keyWord: string;
}

const DetailsArticle = ({ title, content, keyWord }: DetailsArticleProps) => (
	<article
		className={`flex flex-col justify-center gap-2 pl-2 border-l-[3px] border-[var(--contrast-color)] ${
			title === 'Definition' ? 'h-32' : 'h-24'
		}`}>
		<p className='text-zinc-100'>{title}</p>
		<p className='text-zinc-400'>
			{content.split(' ').map((word, i) =>
				word.toLowerCase() === keyWord.toLowerCase() ||
				word.toLowerCase() === `'${keyWord.toLowerCase()}'` ||
				word.toLowerCase() === `${keyWord.toLowerCase()},` ||
				word.toLowerCase() === `${keyWord.toLowerCase()}.` ? (
					<span
						className='text-[var(--contrast-color)]'
						key={i}>
						{word}
					</span>
				) : (
					<> {word} </>
				)
			)}
		</p>
	</article>
);

export default function TranslatedInfoDetails({ definition, example, hint, keyWord }: TranslatedInfoDetailsProps) {
	return (
		<>
			<DetailsArticle
				title='Definition'
				content={definition}
				keyWord={keyWord}
			/>
			<DetailsArticle
				title='Example'
				content={example[0]}
				keyWord={keyWord}
			/>
			<DetailsArticle
				title='Hint'
				content={hint}
				keyWord={keyWord}
			/>
		</>
	);
}
