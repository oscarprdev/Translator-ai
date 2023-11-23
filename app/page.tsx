import EntryForm from '../components/entry-form/entry-form';
import ErrorToast from '../components/error-toast/error-toast';

interface HomePageProps {
	searchParams: {
		error: string;
	};
}

export default async function HomePage({ searchParams }: HomePageProps) {
	return (
		<main className='grid place-items-center w-screen h-screen'>
			<h1 className='text-4xl'>translAItor</h1>
			<EntryForm />
			{searchParams?.error && <ErrorToast message={searchParams.error} />}
		</main>
	);
}
