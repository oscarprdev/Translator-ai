import { ErrorIcon } from '../icons/error-icon';

export default function ErrorToast({ message }: { message: string }) {
	return (
		<div className='flex flex-row items-center gap-3 absolute bottom-2 left-2 py-2 px-5 rounded-md text-white bg-red-500 text-sm font-medium animate-slide-up'>
			<ErrorIcon className='w-5' />
			{message}
		</div>
	);
}
