import Link from 'next/link';
import { ArrowUpRightIcon } from '../icons/arrow-up-right-icon';

interface TranslatedInfoSynAntProps {
	inputContent: string[];
	outputContent: string[];
	langInput: string;
	langOutput: string;
	kind: 'antonyms' | 'synonyms';
}

export default function TranslatedInfoSynAnt({ inputContent, outputContent, langInput, langOutput, kind }: TranslatedInfoSynAntProps) {
	return (
		<article className='flex flex-col gap-4'>
			{inputContent.length > 0 ? (
				inputContent.map((synonym, i) => (
					<div
						key={crypto.randomUUID()}
						className='p-2 border-l-[3px] border-[var(--contrast-color)]'>
						<Link
							href={`/?input=${synonym}&langInput=${langInput}&langOutput=${langOutput}&info=det`}
							className='w-fit flex items-start text-zinc-100 hover:text-[var(--contrast-color)] hover:underline'>
							{synonym}
							<ArrowUpRightIcon className='w-3' />
						</Link>
						<p className='text-zinc-400'>{outputContent[i]}</p>
					</div>
				))
			) : (
				<p className='text-zinc-100 text-center'>No {kind} to show</p>
			)}
		</article>
	);
}
