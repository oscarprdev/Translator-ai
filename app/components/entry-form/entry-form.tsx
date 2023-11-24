'use client';

import { redirect } from 'next/navigation';
import EntryTextarea from './entry-textarea/entry-textarea';
import EntryButton from './entry-button/entry-button';
import EntryLanguage from './entry-language/entry-language';

export default function EntryForm() {
	const redirectAction = (formData: FormData) => {
		const input = formData.get('entry') as string;
		const langInput = formData.get('lang-input') as string;
		const langOutput = formData.get('lang-output') as string;

		redirect(`?input=${input}&langInput=${langInput}&langOutput=${langOutput}`);
	};

	return (
		<section className='grid place-items-center w-[var(--app-width)]'>
			<form
				action={redirectAction}
				className='flex flex-col gap-3 items-center justify-start w-full p-2'>
				<EntryLanguage />
				<EntryTextarea />
				<EntryButton />
			</form>
		</section>
	);
}
