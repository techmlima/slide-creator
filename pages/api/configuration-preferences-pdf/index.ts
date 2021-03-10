
import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
  const { size, fontColor, fontSize, fontFamily, backgroundColor, delimiter } = req.body

  const result = await prisma.configurationPreferencesPDF.create({
    data: {
      size: size,
      fontColor: fontColor,
      fontSize: fontSize,
      fontFamily: fontFamily,
      backgroundColor: backgroundColor,
      delimiter: delimiter
    },
  })
  res.json(result)
}