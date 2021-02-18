
import { getSession } from 'next-auth/client'
import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
  const { title, text } = req.body

  const session = await getSession({ req })
  const result = await prisma.textSource.create({
    data: {
      title: title,
      text: text,
    },
  })
  res.json(result)
}