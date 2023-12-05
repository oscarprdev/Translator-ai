export default function TranslateCardSkeleton() {
	return (
		<div className='animate-pulse relative grid place-items-center py-5 w-[60%] h-[4.6rem] bg-[var(--bg-translated-card)] '>
			<div className='flex items-center space-x-1'>
				<div className='bg-zinc-200 w-1 h-1 rounded-full animate-pulse-delay-100'></div>
				<div className='bg-zinc-200 w-1 h-1 rounded-full animate-pulse-delay-500'></div>
				<div className='bg-zinc-200 w-1 h-1 rounded-full animate-pulse-delay-1000'></div>
			</div>
		</div>
	);
}
