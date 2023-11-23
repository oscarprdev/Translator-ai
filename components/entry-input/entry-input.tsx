import { useEffect, useState } from 'react';

export default function EntryInput({ pending, value }: { pending: boolean; value?: string }) {
	const [inputValue, setInputValue] = useState(value);

	useEffect(() => {
		if (pending === false) {
			setInputValue('');
		}
	}, [pending]);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(event.target.value);
	};

	return (
		<input
			className='px-5 py-2 border border-zinc-200 rounded-lg focus:outline-none'
			id='entry'
			name='entry'
			placeholder='Enter your word'
			disabled={pending}
			value={inputValue}
			onChange={handleInputChange}
		/>
	);
}
