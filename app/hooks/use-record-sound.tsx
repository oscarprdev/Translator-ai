import { useEffect, useRef, useState } from 'react';
import { recordSound } from '../actions/record-sound/record-sound.action';
import { usePathname, useRouter } from 'next/navigation';

const useRecordSound = (langInput: string, langOutput: string) => {
	const [recording, setRecording] = useState<boolean>(false);

	const pathname = usePathname();
	const { replace } = useRouter();

	const mediaRecorder = useRef<MediaRecorder | null>(null);
	const chunks = useRef<Blob[]>([]);

	const startRecording = () => {
		navigator.mediaDevices
			.getUserMedia({ audio: true })
			.then((stream) => {
				mediaRecorder.current = new MediaRecorder(stream);
				mediaRecorder.current.ondataavailable = handleDataAvailable;
				mediaRecorder.current.onstop = handleStop;
				mediaRecorder.current.start();
			})
			.catch((err) => console.error('Error accessing microphone:', err));
	};

	const stopRecording = () => {
		if (mediaRecorder.current) {
			mediaRecorder.current.stop();
		}
	};

	const handleDataAvailable = (e: any) => {
		if (e.data.size > 0) {
			chunks.current.push(e.data);
		}
	};

	const cleanup = () => {
		if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
			mediaRecorder.current.stop();
			chunks.current = [];
		}
	};

	const handleStop = async () => {
		const blob = new Blob(chunks.current, { type: 'audio/mp3' });
		const buffer = await blob.arrayBuffer();
		const uint8Array = new Uint8Array(buffer);

		// Use record sound action to generate text from sound
		const textRecorded = await recordSound(langInput, uint8Array);

		cleanup();
		replace(`${pathname}?input=${textRecorded}&langInput=${langInput}&langOutput=${langOutput}&info=det`);
	};

	useEffect(() => {
		if (recording) {
			startRecording();
		} else {
			stopRecording();
		}

		return cleanup;
	}, [recording]);

	return { recording, setRecording };
};

export default useRecordSound;
