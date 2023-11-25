import { Suspense } from 'react';
import TranslatedInfoServer from '../translated-info-server/translated-info-server';
import TranslatedInfoSkeleton from '../translated-info-skeleton/translated-info-skeleton';

interface TranslatedInfoProps {
	input?: string;
	info: string;
}

export default function TranslatedInfo({ input, info }: TranslatedInfoProps) {
	return (
		<section className='flex flex-col w-full h-full bg-[var(--bg-translated-section)]'>
			{input && (
				<Suspense
					key={input}
					fallback={<TranslatedInfoSkeleton />}>
					<TranslatedInfoServer
						input={input}
						info={info}
					/>
				</Suspense>
			)}
		</section>
	);
}
