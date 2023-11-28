import Link from 'next/link';
import { ReadonlyURLSearchParams } from 'next/navigation';

interface NavLinkProps {
	pathname: string;
	params: ReadonlyURLSearchParams;
	targetInfo: string;
	label: string;
}

export default function NavLink({ pathname, params, targetInfo, label }: NavLinkProps) {
	const paramSelected = params.get('info')?.toString();
	const targetHref = `${pathname}?${params.toString().replace(/&info=.*/, `&info=${targetInfo}`)}`;

	const isSelected = paramSelected === targetInfo;

	return (
		<Link
			href={targetHref}
			className='flex flex-col items-center px-4 '>
			<p className={`hover:text-zinc-300 ${isSelected ? 'text-zinc-200' : 'text-zinc-500'}`}>{label}</p>
			<span
				className={`mt-1 w-full h-1 bg-[var(--contrast-color)] block transition-all duration-300 ease-in-out transform ${
					isSelected ? 'scale-x-100' : 'scale-x-0'
				}`}
			/>
		</Link>
	);
}
