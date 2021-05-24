import prisma from '../../../services/prisma/prisma'

export default async function handle(req, res) {
  const id = Number(req.query.id)
  const { title, name, email } = req.body

  let result;
  switch (req.method) {
    case 'DELETE':
      result = await prisma.organization.delete({
        where: { id: id },
      })
      break;

    case 'PUT':
      result = await prisma.organization.update({
        where: {id: id},
        data: {          
          name: name,
          email: email
        },
      })
      break;

    default:
      break;
  }
  
  res.json(result)
}