export default function EntryTextarea() {
	return (
		<textarea
			className=' px-5 py-2 h-auto min-h-[15vh] resize-none w-full overflow-hidden border-t border-b focus:outline-none'
			id='entry'
			name='entry'
			placeholder='Enter your input'
			required
		/>
	);
}
