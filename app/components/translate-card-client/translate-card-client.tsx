'use client';

import { ChangeEvent, useState } from 'react';
import LanguageSelector from '../language-selector/language-selector';
import { LanguagesParams } from '../language-selector/language-selector.types';
import TextareaInput from '../textarea-input/textarea-input';

const DEFAULT_LANG_PARAMS: LanguagesParams = {
	langInput: 'English',
	langOutput: 'Spanish',
};

export default function TranslateCardClient() {
	const [languages, setLanguages] = useState(DEFAULT_LANG_PARAMS);

	const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
		setLanguages((prev) => {
			prev[e.target.name as keyof LanguagesParams] = e.target.value;

			return prev;
		});
	};

	return (
		<>
			<LanguageSelector
				languages={languages}
				handleSelect={handleSelect}
			/>
			<TextareaInput languages={languages} />
		</>
	);
}
