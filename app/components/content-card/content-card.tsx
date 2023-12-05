import { isHightlightedKeyWord } from './utils';

interface ContentCardProps {
	content: string;
	keyWord: string;
}

export default function ContentCard({ content, keyWord }: ContentCardProps) {
	return (
		<p className='text-zinc-400'>
			{content.split(' ').map((word, i) =>
				isHightlightedKeyWord(word, keyWord) ? (
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
	);
}
