import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
  const id = Number(req.query.id)
  const { title, text, userId } = req.body

  let result;
  switch (req.method) {
    case 'DELETE':
      result = await prisma.music.delete({
        where: { id: id },
      })
      break;

    case 'PUT':
      result = await prisma.music.update({
        where: {id: id},
        data: {          
          title: title,
          text: text,
          userId: userId
        },
      })
      break;

    default:
      break;
  }
  
  res.json(result)
}