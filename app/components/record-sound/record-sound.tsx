'use client';

import { useEffect, useRef, useState } from 'react';
import { MicrophoneIcon } from '../icons/microphone-icon';
import { sendToOpenAI } from '@//actions/test/test-action';

export default function RecordSound() {
	const [recording, setRecording] = useState<boolean>(false);

	const mediaRecorder = useRef<MediaRecorder | null>(null);
	const chunks = useRef<Blob[]>([]);

	const handleRecordButtonClick = () => {
		setRecording(!recording);
	};

	useEffect(() => {
		const handleDataAvailable = (e: any) => {
			if (e.data.size > 0) {
				chunks.current.push(e.data);
			}
		};

		const handleStop = async () => {
			const blob = new Blob(chunks.current, { type: 'audio/mp3' });
			const buffer = await blob.arrayBuffer();
			const uint8Array = new Uint8Array(buffer);

			await sendToOpenAI(uint8Array);
		};

		if (recording) {
			navigator.mediaDevices
				.getUserMedia({ audio: true })
				.then((stream) => {
					mediaRecorder.current = new MediaRecorder(stream);
					mediaRecorder.current.ondataavailable = handleDataAvailable;
					mediaRecorder.current.onstop = handleStop;

					mediaRecorder.current.start();
				})
				.catch((err) => console.error('Error accessing microphone:', err));
		} else {
			if (mediaRecorder.current) {
				mediaRecorder.current.stop();
			}
		}

		return () => {
			if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
				mediaRecorder.current.stop();
			}
		};
	}, [recording]);

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
