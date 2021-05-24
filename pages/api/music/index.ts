
import prisma from '../../../services/prisma/prisma'

export default async function handle(req, res) {
  const { title, text, userId } = req.body

  const result = await prisma.music.create({
    data: {
      title: title,
      text: text,
      userId: userId
    },
  })
  res.json(result)
}