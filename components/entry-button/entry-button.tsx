export default function EntryButton({ pending }: { pending: boolean }) {
	return <button disabled={pending}>{pending ? 'Loading...' : 'Translate'}</button>;
}
