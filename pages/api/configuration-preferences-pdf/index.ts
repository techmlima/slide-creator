
import prisma from '../../../lib/prisma'

export default async function handle(req, res) {
 
  if('POST' === req.method){
    const { size, fontColor, fontSize, fontFamily, backgroundColor, delimiter, userId } = req.body

    const result = await prisma.configurationPreferencesPDF.create({
      data: {
        size: size,
        fontColor: fontColor,
        fontSize: fontSize,
        fontFamily: fontFamily,
        backgroundColor: backgroundColor,
        delimiter: delimiter,
        userId: userId
      },
    })
    res.json(result)
  } else if ('GET' === req.method){
    // console.log(req);
    
    const userId = 11
    const configPreferences = await prisma.configurationPreferencesPDF.findUnique({
      where: { userId: userId }
    })
    res.json(configPreferences);    
  }
}