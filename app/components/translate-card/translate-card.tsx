import { Suspense } from 'react';
import TranslateCardClient from '../translate-card-client/translate-card-client';
import TranslateCardServer from '../translate-card-server/translate-card-server';
import TranslateCardSkeleton from '../translate-card-skeleton/translate-card-skeleton';

interface TranslateCardProps {
	input: string;
	langInput: string;
	langOutput: string;
}

const TranslateCardServerController = ({ input, langInput, langOutput }: TranslateCardProps) => {
	return (
		<section className='grid place-items-center w-full h-[20vh] bg-[var(--bg-translated-section)]'>
			{input && (
				<Suspense
					key={input}
					fallback={<TranslateCardSkeleton />}>
					<TranslateCardServer
						input={input}
						langInput={langInput}
						langOutput={langOutput}
					/>
				</Suspense>
			)}
		</section>
	);
};

export default function TranslateCard({ input, langInput, langOutput }: TranslateCardProps) {
	return (
		<section className='flex flex-col w-full items-center justify-center gap-5'>
			<TranslateCardClient />
			<TranslateCardServerController
				input={input}
				langInput={langInput}
				langOutput={langOutput}
			/>
		</section>
	);
}
