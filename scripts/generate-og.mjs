import sharp from 'sharp'

await sharp('public/og-card.svg').png().toFile('public/og-card.png')
console.log('Generated public/og-card.png')

await Promise.all([
  sharp('public/whale-mark.png').resize(180, 180).png().toFile('public/apple-touch-icon.png'),
  sharp('public/whale-mark.png').resize(192, 192).png().toFile('public/icon-192.png'),
  sharp('public/whale-mark.png').resize(512, 512).png().toFile('public/icon-512.png'),
])
console.log('Generated favicon and app icon PNGs')
