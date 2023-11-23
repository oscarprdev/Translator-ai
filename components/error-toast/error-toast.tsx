export default function ErrorToast({ message }: { message: string }) {
	return (
		<div className='absolute bottom-2 left-2 py-2 px-5 rounded-md text-white bg-red-500 text-sm font-light animate-slide-up'>{message}</div>
	);
}
