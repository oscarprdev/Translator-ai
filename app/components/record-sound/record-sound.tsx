'use client';

import { MicrophoneIcon } from '../icons/microphone-icon';
import useRecordSound from '@//hooks/use-record-sound';

interface RecordSoundProps {
	langInput: string;
	langOutput: string;
}

export default function RecordSound({ langInput, langOutput }: RecordSoundProps) {
	const { recording, setRecording } = useRecordSound(langInput, langOutput);

	const handleRecordButtonClick = () => {
		setRecording(!recording);
	};

	return (
		<button
			onClick={handleRecordButtonClick}
			className={`z-10 left-[42.5%] absolute bottom-[-3.5rem] group grid place-items-center`}>
			<MicrophoneIcon
				className={`${
					recording && 'text-[var(--contrast-color)]'
				} z-10 w-20 rounded-full p-4 bg-white group-hover:text-[var(--contrast-color)] duration-300`}
			/>

			<span
				className={`${
					recording ? 'animate-record-pulse-1' : 'hidden'
				}  z-1 absolute rounded-full w-32 h-32 bg-[var(--contrast-color-record)]`}></span>
			<span
				className={`${
					recording ? 'animate-record-pulse-2' : 'hidden'
				} z-1 absolute rounded-full w-32 h-32 bg-[var(--contrast-color-record)]`}></span>
		</button>
	);
}
