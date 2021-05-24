
import prisma from '../../../services/prisma/prisma'

export default async function handle(req, res) {
  const { name, email, userId } = req.body

  const result = await prisma.organization.create({
    data: {
      name: name,
      email: email,
      users: { 
        connect: { id: userId }
      }
    }
  })

  res.json(result)
}