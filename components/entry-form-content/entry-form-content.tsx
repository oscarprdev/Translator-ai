import { TranslatedEntry } from '@prisma/client';
import { useFormStatus } from 'react-dom';
import EntryInput from '../entry-input/entry-input';
import EntryButton from '../entry-button/entry-button';
import EntryTranslatedSkeleton from '../entry-translated-skeleton/entry-translated-skeleton';
import EntryTranslated from '../entry-translated/entry-translated';

export default function EntryFormContent({ entry }: { entry: TranslatedEntry | null }) {
	const { pending, data } = useFormStatus();

	return (
		<>
			<EntryInput
				pending={pending}
				value={data?.get('input') as string}
			/>
			<EntryButton pending={pending} />
			{pending ? <EntryTranslatedSkeleton /> : <EntryTranslated entry={entry} />}
		</>
	);
}
