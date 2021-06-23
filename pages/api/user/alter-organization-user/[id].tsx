import prisma from '../../../../services/prisma/prisma'

export default async function handle(req, res) {
  const id = Number(req.query.id)
  const { organizationId } = req.body

  let result = await prisma.user.update({
    where: {id: id},
    data: {          
      organizationId: organizationId
    },
  })
  
  res.json(result)
}