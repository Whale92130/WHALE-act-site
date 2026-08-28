import sharp from 'sharp'

await sharp('public/og-card.svg').png().toFile('public/og-card.png')
console.log('Generated public/og-card.png')
