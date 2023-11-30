import { Suspense } from 'react';
import TranslatedInfoServer from '../translated-info-server/translated-info-server';
import TranslatedInfoSkeleton from '../translated-info-skeleton/translated-info-skeleton';

interface TranslatedInfoProps {
	input?: string;
	langInput: string;
	langOutput: string;
	info: string;
}

export default function TranslatedInfo({ input, langInput, langOutput, info }: TranslatedInfoProps) {
	return (
		<section className='flex flex-col pt-5 w-full h-full bg-[var(--bg-translated-section)]'>
			{input && (
				<Suspense
					key={input}
					fallback={<TranslatedInfoSkeleton />}>
					<TranslatedInfoServer
						input={input}
						langInput={langInput}
						langOutput={langOutput}
						info={info}
					/>
				</Suspense>
			)}
		</section>
	);
}
