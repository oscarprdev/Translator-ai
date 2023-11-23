import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	const test = await prisma.translatedEntry.create({
		data: {
			kind: 'word',
			original: 'defeat',
			translated: 'derrota',
			synonyms: ['failure', 'conquest'],
			antonyms: ['victory', 'triumph'],
			hint: 'some hint',
			example: ['some example'],
			definition:
				'"Defeat" refers to the act of being overcome or beaten in a competition, conflict, or struggle. It signifies the opposite of victory and often carries a sense of disappointment or setback.',
		},
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
