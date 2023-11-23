import EntryForm from '../components/entry-form/entry-form';

export default async function HomePage() {
	return (
		<main className='grid place-items-center w-screen h-screen'>
			<h1 className='text-4xl'>translAItor</h1>
			<EntryForm />
		</main>
	);
}
