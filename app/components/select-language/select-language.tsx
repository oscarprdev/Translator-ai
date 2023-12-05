import { ChangeEvent } from 'react';
import { LangParams } from '../language-selector/language-selector.types';

interface SelectLanguageProps {
	name: LangParams.input | LangParams.output;
	availables: string[];
	selected: string;
	handleSelectLanguages(e: ChangeEvent<HTMLSelectElement>): void;
}

export default function SelectLanguage({ name, selected, availables, handleSelectLanguages }: SelectLanguageProps) {
	return (
		<select
			name={name}
			onChange={handleSelectLanguages}>
			{availables.map((lang) => (
				<option
					key={crypto.randomUUID().toString()}
					value={lang}
					selected={lang === selected}>
					{lang}
				</option>
			))}
		</select>
	);
}
