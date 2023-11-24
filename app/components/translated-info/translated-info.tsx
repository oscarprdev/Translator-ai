import { Suspense } from 'react';
import TranslatedInfoServer from '../translated-info-server/translated-info-server';
import TranslatedInfoSkeleton from '../translated-info-skeleton/translated-info-skeleton';

export default function TranslatedInfo({ input }: { input?: string }) {
	return (
		<section className='flex flex-col w-[var(--app-width)]'>
			{input && (
				<div>
					<Suspense
						key={crypto.randomUUID.toString()}
						fallback={<TranslatedInfoSkeleton />}>
						<TranslatedInfoServer input={input} />
					</Suspense>
				</div>
			)}
		</section>
	);
}
