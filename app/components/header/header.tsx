import { BrandIcon } from '../icons/brand-icon';

export default function Header() {
	return (
		<header className='flex items-center justify-start w-full py-2 px-5 '>
			<BrandIcon className='w-10 fill-white' />
			<h1 className='text-3xl'>Lingo</h1>
		</header>
	);
}
