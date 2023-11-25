import ToastError from './components/toast-error/toast-error';
import TranslateCard from './components/translate-card/translate-card';
import TranslatedInfo from './components/translated-info/translated-info';

interface HomePageProps {
	searchParams: {
		error: string;
		input: string;
		info: string;
	};
}

export default async function HomePage({ searchParams }: HomePageProps) {
	return (
		<main className='flex flex-col items-center h-screen w-full max-w-[var(--max-width)] border-l border-r border-zinc-100'>
			<TranslateCard input={searchParams.input} />
			<TranslatedInfo
				input={searchParams.input}
				info={searchParams.info}
			/>
			{searchParams?.error && <ToastError message={searchParams.error} />}
		</main>
	);
}
