import EntryForm from './components/entry-form/entry-form';
import ErrorToast from './components/error-toast/error-toast';
import EntryTranslatedWrapper from './components/entry-translated-wrapper/entry-translated-wrapper';

interface HomePageProps {
	searchParams: {
		error: string;
		input: string;
	};
}

export default async function HomePage({ searchParams }: HomePageProps) {
	return (
		<main className='flex flex-col items-center w-screen h-full'>
			<EntryForm />
			<EntryTranslatedWrapper input={searchParams.input} />
			{searchParams?.error && <ErrorToast message={searchParams.error} />}
		</main>
	);
}
