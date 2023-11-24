interface TranslateCardSkeletonProps {
	loading?: boolean;
}

export default function TranslateCardSkeleton({ loading }: TranslateCardSkeletonProps) {
	return (
		<div className='w-full h-full'>
			<textarea
				value={loading ? 'Loading...' : ''}
				className='h-full p-2 outline-none resize-none w-full overflow-hidden border border-zinc-200'
			/>
		</div>
	);
}
