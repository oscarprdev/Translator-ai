import { Suspense } from 'react';
import TranslateCardClient from '../translate-card-client/translate-card-client';
import TranslateCardServer from '../translate-card-server/translate-card-server';
import TranslateCardSkeleton from '../translate-card-skeleton/translate-card-skeleton';

interface TranslateCardProps {
	input: string;
}

const TranslateCardServerController = ({ input }: TranslateCardProps) => {
	return (
		<section className='grid place-items-center w-full h-[20vh] bg-[var(--bg-translated-section)]'>
			{input && (
				<Suspense
					key={input}
					fallback={<TranslateCardSkeleton />}>
					<TranslateCardServer input={input} />
				</Suspense>
			)}
		</section>
	);
};

export default function TranslateCard({ input }: TranslateCardProps) {
	return (
		<section className='flex flex-col w-full items-center justify-center gap-5'>
			<TranslateCardClient />
			<TranslateCardServerController input={input} />
		</section>
	);
}
