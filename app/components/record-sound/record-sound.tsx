'use client';

import { useState } from 'react';
import { MicrophoneIcon } from '../icons/microphone-icon';

export default function RecordSound() {
	const [recording, setRecording] = useState<boolean>(false);

	const handleRecordButtonClick = () => {
		setRecording(!recording);
	};

	return (
		<button
			onClick={handleRecordButtonClick}
			className={`z-10 absolute top-[-2.5rem] group grid place-items-center`}>
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
