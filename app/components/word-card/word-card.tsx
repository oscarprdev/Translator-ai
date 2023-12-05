import { SoundIcon } from '../icons/ear-icon';
import TranslatedSound from '../translated-sound/translated-sound';

interface WordCardProps {
	content: string;
}

export default function WordCard({ content }: WordCardProps) {
	return (
		<div className='relative grid place-items-center h-16 w-[60%] bg-[var(--bg-translated-card)]'>
			<span className='absolute top-0 left-0 h-full w-2 bg-[var(--contrast-color)]'></span>
			<p className='text-zinc-300 capitalize h-5'>{content}</p>
			{content && <TranslatedSound content={content} />}
		</div>
	);
}
