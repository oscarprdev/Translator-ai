import { TransferIcon } from '../../icons/transfer-icon';

export default function EntryLanguage() {
	return (
		<div className='flex items-center gap-5'>
			<select name='lang-input'>
				<option value='english'>English</option>
				<option value='spanish'>Spanish</option>
			</select>
			<span className='py-1 px-3 rounded-full border-2 border-zinc-100  group '>
				<TransferIcon className='w-5 text-zinc-500 group-hover:text-zinc-800' />
			</span>
			<select name='lang-output'>
				<option value='spanish'>Spanish</option>
				<option value='english'>English</option>
			</select>
		</div>
	);
}
