'use client';

import { ChangeEvent, useState } from 'react';
import LanguageSelector from '../language-selector/language-selector';
import { DefaultLanguages, LanguagesParams } from '../language-selector/language-selector.types';
import TranslateCardInput from '../translate-card-input/translate-card-input';
import RecordSound from '../record-sound/record-sound';

export const DEFAULT_LANG_PARAMS: LanguagesParams = {
	langInput: 'english',
	langOutput: 'spanish',
};

const ALL_LANGUAGES = ['english', 'spanish', 'german', 'italian'];

export default function TranslateCardClient() {
	const [languages, setLanguages] = useState(DEFAULT_LANG_PARAMS);
	const [availableLanguages, setAvailableLanguages] = useState<DefaultLanguages>({
		langInput: ALL_LANGUAGES.filter((lang) => lang !== DEFAULT_LANG_PARAMS.langOutput),
		langOutput: ALL_LANGUAGES.filter((lang) => lang !== DEFAULT_LANG_PARAMS.langInput),
	});

	const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
		const langParam = e.target.name as keyof LanguagesParams;
		const langValue = e.target.value;

		setAvailableLanguages((prev: any) => ({
			langInput: langParam === 'langOutput' ? ALL_LANGUAGES.filter((lang) => lang !== langValue) : prev.langInput,
			langOutput: langParam === 'langInput' ? ALL_LANGUAGES.filter((lang) => lang !== langValue) : prev.langOutput,
		}));

		setLanguages((prev) => ({
			...prev,
			[langParam]: langValue,
		}));
	};

	return (
		<div className='relative flex flex-col gap-10 w-full p-10'>
			<LanguageSelector
				languages={languages}
				availableLanguages={availableLanguages}
				handleSelect={handleSelect}
			/>
			<TranslateCardInput languages={languages} />
			<RecordSound
				langInput={languages.langInput}
				langOutput={languages.langOutput}
			/>
		</div>
	);
}
