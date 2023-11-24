import { translateInputAction } from '../../../actions/translate-input/translate-input.action';

interface InfoTranslatedProps {
	input: string;
}

export default async function InputTranslated({ input }: InfoTranslatedProps) {
	const entry = await translateInputAction(input);

	return (
		<section>
			<p>{entry.original}</p>
			<p>{entry.translated}</p>
		</section>
	);
}
