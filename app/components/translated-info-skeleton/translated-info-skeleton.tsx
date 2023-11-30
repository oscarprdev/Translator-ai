export default function TranslatedInfoSkeleton() {
	return (
		<section className='animate-pulse flex flex-col w-full gap-10 px-10 pb-10'>
			<nav className='flex items-center justify-center gap-5 px-5'>
				<div className='flex flex-col items-center px-4'>
					<p className='text-zinc-500'>Details</p>
				</div>
				<div className='flex flex-col items-center px-4'>
					<p className='text-zinc-500'>Synonyms</p>
				</div>
				<div className='flex flex-col items-center px-4'>
					<p className='text-zinc-500'>Antonyms</p>
				</div>
				<div className='flex flex-col items-center px-4'>
					<p className='text-zinc-500'>Examples</p>
				</div>
			</nav>
			<article className='flex flex-col justify-center gap-2 pl-2 border-l-[3px] border-[var(--contrast-color)] h-24'>
				<span className='bg-zinc-600 h-4 w-32 rounded-md' />
				<span className='bg-zinc-600 h-4 w-full rounded-md' />
				<span className='bg-zinc-600 h-4 w-full rounded-md' />
			</article>
			<article className='flex flex-col justify-center gap-2 pl-2 border-l-[3px] border-[var(--contrast-color)] h-24'>
				<span className='bg-zinc-600 h-4 w-32 rounded-md' />
				<span className='bg-zinc-600 h-4 w-full rounded-md' />
				<span className='bg-zinc-600 h-4 w-full rounded-md' />
			</article>
			<article className='flex flex-col justify-center gap-2 pl-2 border-l-[3px] border-[var(--contrast-color)] h-24'>
				<span className='bg-zinc-600 h-4 w-32 rounded-md' />
				<span className='bg-zinc-600 h-4 w-full rounded-md' />
				<span className='bg-zinc-600 h-4 w-full rounded-md' />
			</article>
		</section>
	);
}
