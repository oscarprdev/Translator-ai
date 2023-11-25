import { BrandIcon } from '../icons/brand-icon';

export default function Header() {
	return (
		<header className='flex items-center justify-center w-full py-4 px-5 '>
			{/* <BrandIcon className='w-10 fill-white' /> */}
			<h1 className='text-md text-zinc-500'>TRANSLATE</h1>
		</header>
	);
}
