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
		<div className='flex items-center justify-center gap-10 w-full'>
			<div className='flex flex-col items-center'>
				<p className='text-zinc-400 text-sm uppercase'>from</p>
				<SelectLanguage
					name={LangParams.input}
					selected={languages.langInput}
					handleSelectLanguages={handleSelect}
				/>
			</div>
			<span className='rounded-full border-2 border-zinc-600 hover:border-zinc-800 cursor-pointer group'>
				<TransferIcon className='w-6 text-zinc-600 group-hover:text-zinc-800' />
			</span>
			<div className='flex flex-col items-center'>
				<p className='text-zinc-400 text-sm uppercase'>to</p>
				<SelectLanguage
					name={LangParams.output}
					selected={languages.langOutput}
					handleSelectLanguages={handleSelect}
				/>
			</div>
		</div>
	);
}
