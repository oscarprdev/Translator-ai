import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	const englishDictionary = await prisma.dictionary.create({
		data: {
			language: 'english',
			entries: {
				create: {
					kind: 'Noun',
					lang: 'english',
					word: 'strong',
					synonyms: ['powerful', 'mighty'],
					antonyms: ['weak'],
					examples: ['He is very strong.'],
					definition: 'Having great physical power.',
					uses: 'Commonly used to describe physical strength.',
					translations: {
						create: [{ language: 'spanish', translation: 'fuerte' }],
					},
				},
			},
		},
		include: {
			entries: {
				include: {
					translations: true,
				},
			},
		},
	});

	const spanishDictionary = await prisma.dictionary.create({
		data: {
			language: 'spanish',
			entries: {
				create: {
					kind: 'Noun',
					lang: 'spanish',
					word: 'fuerte',
					synonyms: ['poderoso', 'robusto'],
					antonyms: ['débil'],
					examples: ['Él es muy fuerte.'],
					definition: 'Que tiene gran fuerza física.',
					uses: 'Comúnmente utilizado para describir la fuerza física.',
					translations: {
						create: [{ language: 'english', translation: 'strong' }],
					},
				},
			},
		},
		include: {
			entries: {
				include: {
					translations: true,
				},
			},
		},
	});

	console.log('Entries created:', englishDictionary.entries[0], spanishDictionary.entries[0]);
	console.log('Dictionaries created:', englishDictionary, spanishDictionary);
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
