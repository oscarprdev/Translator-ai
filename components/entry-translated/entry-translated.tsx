import { TranslatedEntry } from '@prisma/client';

interface EntryTranslatedProps {
	entry: TranslatedEntry | null;
}
export default function EntryTranslated({ entry }: EntryTranslatedProps) {
	return <p>{entry?.definition}</p>;
}
