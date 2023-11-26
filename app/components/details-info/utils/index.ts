export function isHightlightedKeyWord(word: string, keyWord: string) {
	const initialWord = word.toLowerCase();
	const incomingWord = keyWord.toLowerCase();

	return (
		initialWord === incomingWord ||
		initialWord === `'${incomingWord}'` ||
		initialWord === `${incomingWord},` ||
		initialWord === `${incomingWord}.`
	);
}
