'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import NavLink from '../nav-link/nav-link';

export default function TransalatedInfoNav() {
	const pathname = usePathname();
	const params = useSearchParams();

	return (
		<nav className='flex items-center justify-center gap-5 px-5'>
			<NavLink
				pathname={pathname}
				params={params}
				targetInfo='det'
				label='Details'
			/>
			<NavLink
				pathname={pathname}
				params={params}
				targetInfo='onyms'
				label='Synonyms & Antonyms'
			/>
			<NavLink
				pathname={pathname}
				params={params}
				targetInfo='alt'
				label='Alternatives'
			/>
		</nav>
	);
}
