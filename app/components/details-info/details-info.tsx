'use client';

import { useState } from 'react';
import { isHightlightedKeyWord } from './utils';
import { TranslateIcon } from '../icons/translate-icon';

interface DetailsInfoProps {
	title: string;
	content: string;
	contentTranslated: string;
	keyWord: string;
	keyWordTranslated: string;
}

interface ContentProps {
	content: string;
	keyWord: string;
}

const Content = ({ content, keyWord }: ContentProps) => {
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
};

export default function DetailsInfo({ title, content, contentTranslated, keyWord, keyWordTranslated }: DetailsInfoProps) {
	const [translated, setTranslated] = useState(false);

	const toggleTranslated = () => setTranslated(!translated);

	return (
		<article
			className={`relative flex flex-col justify-center gap-2 pl-2 border-l-[3px] border-[var(--contrast-color)] ${
				title === 'Definition' ? 'h-32' : 'h-24'
			}`}>
			<p className='text-zinc-100'>{title}</p>
			{translated ? (
				<Content
					content={contentTranslated}
					keyWord={keyWordTranslated}
				/>
			) : (
				<Content
					content={content}
					keyWord={keyWord}
				/>
			)}
			<button
				onClick={toggleTranslated}
				className='absolute bottom-0 right-2 text-xs p-1 rounded-full  text-[var(--contrast-color)] hover:text-[var(--contrast-color-hover)]'>
				{translated ? 'Translate' : 'Traducir'}
			</button>
		</article>
	);
}
