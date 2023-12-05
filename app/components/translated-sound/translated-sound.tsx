'use client';

import { translatedSoundAction } from '@//actions/translate-sound/translate-sound.action';
import { SoundIcon } from '../icons/ear-icon';
import { useEffect, useRef, useState } from 'react';

interface TranslatedSoundProps {
	content: string;
}

export default function TranslatedSound({ content }: TranslatedSoundProps) {
	const [audio, setAudio] = useState<string>();
	const audioRef = useRef<HTMLAudioElement>();

	const handleAudio = async () => {
		const src = await translatedSoundAction(content);
		// setAudio('/music/speech.mp3');
		audioRef.current.src = src;
		audioRef.current.volume = 1;
		audioRef.current.play();
	};

	// useEffect(() => {
	// 	if (audioRef.current && audio) {
	// 		audioRef.current.src = audio;
	// 		audioRef.current.volume = 1;
	// 		audioRef.current.play();
	// 	}
	// }, [audio]);

	return (
		<button onClick={handleAudio}>
			<SoundIcon className='absolute bottom-1 right-1 w-5 cursor-pointer text-zinc-400 hover:text-[var(--contrast-color)]' />
			<audio ref={audioRef} />
		</button>
	);
}
