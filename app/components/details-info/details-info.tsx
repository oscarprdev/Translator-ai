'use client';

import { useState } from 'react';
import ContentCard from '../content-card/content-card';

interface DetailsInfoProps {
	title: string;
	content: string;
	contentTranslated: string;
	keyWord: string;
	keyWordTranslated: string;
}

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
				<ContentCard
					content={contentTranslated}
					keyWord={keyWordTranslated}
				/>
			) : (
				<ContentCard
					content={content}
					keyWord={keyWord}
				/>
			)}
			<button
				onClick={toggleTranslated}
				className='absolute bottom-0 right-2 text-xs p-1 rounded-full  text-[var(--contrast-color)] hover:text-[var(--contrast-color-hover)]'>
				{translated ? 'Traducir' : 'Translate'}
			</button>
		</article>
	);
}
