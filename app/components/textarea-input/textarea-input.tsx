import { usePathname, useRouter } from 'next/navigation';
import { ChangeEvent } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { LanguagesParams } from '../language-selector/language-selector.types';

interface TextareaInputProps {
	languages: LanguagesParams;
}

const DEBOUNCE_TIMEOUT = 1000;

export default function TextareaInput({ languages }: TextareaInputProps) {
	const pathname = usePathname();
	const { replace } = useRouter();

	const handleTextarea = useDebouncedCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
		const input = e.target.value;

		replace(`${pathname}?input=${input}&langInput=${languages.langInput}&langOutput=${languages.langOutput}`);
	}, DEBOUNCE_TIMEOUT);

	return (
		<div className='w-full h-full'>
			<textarea
				className='h-full p-2 outline-none resize-none w-full overflow-hidden border border-zinc-200'
				placeholder='Enter your input'
				onChange={handleTextarea}
			/>
		</div>
	);
}
