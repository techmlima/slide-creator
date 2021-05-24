
import prisma from '../../../services/prisma/prisma'

export default async function handle(req, res) {
  const { name, email } = req.body

  const result = await prisma.organization.create({
    data: {
      name: name,
      email: email
    },
  })
  res.json(result)
}