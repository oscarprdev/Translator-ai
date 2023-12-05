'use client';

import { translatedSoundAction } from '@//actions/translate-sound/translate-sound.action';
import { SoundIcon } from '../icons/ear-icon';
import { useRef } from 'react';

interface TranslatedSoundProps {
	content: string;
}

export default function TranslatedSound({ content }: TranslatedSoundProps) {
	const audioRef = useRef<HTMLAudioElement>(null);

	const handleAudio = async () => {
		const src = await translatedSoundAction(content);

		const audioElement = audioRef.current;

		if (audioElement) {
			audioElement.src = src;
			audioElement.volume = 1;
			audioElement.play();
		}
	};

	return (
		<button
			onClick={handleAudio}
			className='absolute right-2 bottom-0'>
			<SoundIcon className='absolute bottom-1 right-1 w-5 cursor-pointer text-zinc-400 hover:text-[var(--contrast-color)]' />
			<audio ref={audioRef} />
		</button>
	);
}
