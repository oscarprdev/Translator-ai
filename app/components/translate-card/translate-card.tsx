import { Suspense } from 'react';
import TranslateCardClient from '../translate-card-client/translate-card-client';
import TranslateCardServer from '../translate-card-server/translate-card-server';
import TranslateCardSkeleton from '../translate-card-skeleton/translate-card-skeleton';

interface TranslateCardProps {
	input: string;
}

const TranslateCardServerController = ({ input }: TranslateCardProps) => {
	return (
		<>
			{input ? (
				<Suspense
					key={crypto.randomUUID().toString()}
					fallback={<TranslateCardSkeleton loading />}>
					<TranslateCardServer input={input} />
				</Suspense>
			) : (
				<TranslateCardSkeleton />
			)}
		</>
	);
};

export default function TranslateCard({ input }: TranslateCardProps) {
	return (
		<section className='relative flex items-center justify-center gap-2 w-[var(--app-width)] pt-10'>
			<TranslateCardClient />
			<TranslateCardServerController input={input} />
		</section>
	);
}
