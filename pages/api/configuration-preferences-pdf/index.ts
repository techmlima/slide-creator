
import prisma from '../../../services/prisma/prisma'

export default async function handle(req, res) {
  const { id, size, fontColor, fontSize, fontFamily, backgroundColor, delimiter, organizationId } = req.body
  let result;

  switch (req.method) {
    case 'POST':
      result = await prisma.configurationPreferencesPDF.create({
        data: {
          size: size,
          fontColor: fontColor,
          fontSize: fontSize,
          fontFamily: fontFamily,
          backgroundColor: backgroundColor,
          delimiter: delimiter,
          organizationId: organizationId
        }
      })
      break;

    case 'PUT':
      result = await prisma.configurationPreferencesPDF.update({
        where: { id: id },
        data: {
          size: size,
          fontColor: fontColor,
          fontSize: fontSize,
          fontFamily: fontFamily,
          backgroundColor: backgroundColor,
          delimiter: delimiter,
          organizationId: organizationId
        }
      })
  
    default:
      break;
  }

  res.json(result)
}