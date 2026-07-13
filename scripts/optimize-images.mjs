import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'

const imagesDir = 'public/images'
const targets = [
  'qinghe-campus-01.jpg',
  'italian-residence-01.jpg',
  'italian-residence-02.jpg',
  'italian-residence-03.jpg',
  'jiaopian-shijing-01.jpg',
  'jiaopian-shijing-02.jpg',
  'jiaopian-shijing-03.jpg',
  'shuxiang-residence-01.jpg',
  'shuxiang-residence-02.jpg',
  'shuxiang-residence-03.jpg',
]

const MAX_WIDTH = 1600
const JPEG_QUALITY = 80

async function optimize() {
  for (const file of targets) {
    const inputPath = path.join(imagesDir, file)
    if (!fs.existsSync(inputPath)) {
      console.warn(`Missing: ${inputPath}`)
      continue
    }

    const originalSize = fs.statSync(inputPath).size
    const inputBuffer = await fs.promises.readFile(inputPath)

    const outputBuffer = await sharp(inputBuffer)
      .resize({
        width: MAX_WIDTH,
        withoutEnlargement: true,
        fit: 'inside',
      })
      .jpeg({
        quality: JPEG_QUALITY,
        progressive: true,
        mozjpeg: true,
      })
      .toBuffer()

    await fs.promises.writeFile(inputPath, outputBuffer)
    const newSize = outputBuffer.length
    const reduction = ((1 - newSize / originalSize) * 100).toFixed(1)
    console.log(`${file}: ${(originalSize / 1024 / 1024).toFixed(2)}MB -> ${(newSize / 1024 / 1024).toFixed(2)}MB (${reduction}% reduction)`)
  }
}

optimize().catch((err) => {
  console.error(err)
  process.exit(1)
})
