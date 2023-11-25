import { usePathname, useRouter } from 'next/navigation';
import { ChangeEvent } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { LanguagesParams } from '../language-selector/language-selector.types';

interface TranslateCardInputProps {
	languages: LanguagesParams;
}

const DEBOUNCE_TIMEOUT = 500;

export default function TranslateCardInput({ languages }: TranslateCardInputProps) {
	const pathname = usePathname();
	const { replace } = useRouter();

	const handleInput = useDebouncedCallback((e: ChangeEvent<HTMLInputElement>) => {
		const input = e.target.value;

		replace(`${pathname}?input=${input}&langInput=${languages.langInput}&langOutput=${languages.langOutput}`);
	}, DEBOUNCE_TIMEOUT);

	return (
		<input
			className='p-2 outline-none resize-none w-full overflow-hidden border-b capitalize border-zinc-200'
			placeholder='Enter a word, phrasal verb or an idiom to be translated'
			onChange={handleInput}
		/>
	);
}
