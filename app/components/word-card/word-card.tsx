import { SoundIcon } from '../icons/ear-icon';

interface WordCardProps {
	content: string;
}

export default function WordCard({ content }: WordCardProps) {
	return (
		<div className='relative grid place-items-center h-24 w-[60%] bg-[var(--bg-translated-card)]'>
			<span className='absolute top-0 left-0 h-full w-2 bg-[var(--contrast-color)]'></span>
			<p className='text-zinc-300 capitalize h-5'>{content}</p>
			{content && <SoundIcon className='absolute bottom-1 right-1 w-5 cursor-pointer text-zinc-400 hover:text-[var(--contrast-color)]' />}
		</div>
	);
}
