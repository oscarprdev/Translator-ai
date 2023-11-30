import { ChangeEvent } from 'react';
import { LangParams } from '../language-selector/language-selector.types';

const languagesAvailables = ['english', 'spanish'];

interface SelectLanguageProps {
	name: LangParams.input | LangParams.output;
	selected: string;
	handleSelectLanguages(e: ChangeEvent<HTMLSelectElement>): void;
}

export default function SelectLanguage({ name, selected, handleSelectLanguages }: SelectLanguageProps) {
	return (
		<select
			name={name}
			onChange={handleSelectLanguages}>
			{languagesAvailables.map((lang) => (
				<option
					key={crypto.randomUUID().toString()}
					value={lang}
					defaultValue={lang === selected ? lang : 0}>
					{lang}
				</option>
			))}
		</select>
	);
}
