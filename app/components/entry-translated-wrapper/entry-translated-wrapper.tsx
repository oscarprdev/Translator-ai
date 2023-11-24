import { Suspense } from 'react';
import InfoTranslatedSkeleton from './info-translated-skeleton/info-translated-skeleton';
import InfoTranslated from './info-translated/info-translated';
import InputTranslated from './input-translated/input-traslated';

export default function EntryTranslatedWrapper({ input }: { input?: string }) {
	return (
		<section className='flex flex-col w-[var(--app-width)]'>
			{input && (
				<div>
					<Suspense
						key={1}
						fallback={<p>Loading detail</p>}>
						<InputTranslated input={input} />
					</Suspense>
					<Suspense
						key={2}
						fallback={<p>Loading info</p>}>
						<InfoTranslated input={input} />
					</Suspense>
				</div>
			)}
		</section>
	);
}
