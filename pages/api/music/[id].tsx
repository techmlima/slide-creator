import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
  const textId = req.query.id
  if (req.method === 'DELETE') {
    const music = await prisma.music.delete({
      where: { id: Number(textId) },
    })
    res.json(music)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}