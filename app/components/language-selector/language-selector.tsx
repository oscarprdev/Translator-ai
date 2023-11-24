// LanguageSelector.tsx
import { ChangeEvent } from 'react';
import SelectLanguage from '../select-language/select-language';
import { TransferIcon } from '../icons/transfer-icon';
import { LangParams, LanguagesParams } from './language-selector.types';

interface LanguageSelectorProps {
	languages: LanguagesParams;
	handleSelect(e: ChangeEvent<HTMLSelectElement>): void;
}

export default function LanguageSelector({ languages, handleSelect }: LanguageSelectorProps) {
	return (
		<div className='absolute top-0 flex items-center gap-5'>
			<SelectLanguage
				name={LangParams.input}
				selected={languages.langInput}
				handleSelectLanguages={handleSelect}
			/>
			<span className='py-1 px-3 rounded-full border-2 border-zinc-100 hover:border-zinc-200 cursor-pointer group'>
				<TransferIcon className='w-5 text-zinc-500 group-hover:text-zinc-800' />
			</span>
			<SelectLanguage
				name={LangParams.output}
				selected={languages.langOutput}
				handleSelectLanguages={handleSelect}
			/>
		</div>
	);
}
