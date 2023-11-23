'use client';

import { useFormState } from 'react-dom';
import { translateEntryAction } from '../../actions/translate-entry/translate-entry.action';
import { TranslatedEntry } from '@prisma/client';
import EntryFormContent from '../entry-form-content/entry-form-content';

interface FormState {
	entry: TranslatedEntry | null;
}

const initialState: FormState = {
	entry: null,
};

export default function EntryForm() {
	const [state, dispatchAction] = useFormState(translateEntryAction, initialState);

	return (
		<section>
			<form action={dispatchAction}>
				<EntryFormContent entry={state.entry} />
			</form>
		</section>
	);
}
