'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import NavLink from '../nav-link/nav-link';

const TABS_LOCATIONS = {
	details: 'det',
	synonyms: 'syn',
	antonyms: 'ant',
	examples: 'ex',
};

export default function TransalatedInfoNav() {
	const pathname = usePathname();
	const params = useSearchParams();

	return (
		<nav className='flex items-center justify-center gap-5 px-5'>
			<NavLink
				pathname={pathname}
				params={params}
				targetInfo={TABS_LOCATIONS.details}
				label='Details'
			/>
			<NavLink
				pathname={pathname}
				params={params}
				targetInfo={TABS_LOCATIONS.synonyms}
				label='Synonyms'
			/>
			<NavLink
				pathname={pathname}
				params={params}
				targetInfo={TABS_LOCATIONS.antonyms}
				label='Antonyms'
			/>
			<NavLink
				pathname={pathname}
				params={params}
				targetInfo={TABS_LOCATIONS.examples}
				label='Examples'
			/>
		</nav>
	);
}
