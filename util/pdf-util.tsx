import { TextSourceProps } from "../components/TextSource";

const generateSourcePDF = (textSource: TextSourceProps, splitValue: string) => {
    return [textSource?.title].concat(textSource?.text.split(splitValue));
}

const generateSourceMultiplePDF = (textSources: TextSourceProps[], splitValue: string) => {
    let arrayRetorno = [];
    textSources.filter(textS => textS.isCreatePDF)
      .map(t => ([t.title].concat(t?.text.split(splitValue))))
      .forEach(t => arrayRetorno = arrayRetorno.concat(t))  
  
    return arrayRetorno;
}

const findSourceById = (textSources: TextSourceProps[], id: number):TextSourceProps => {
  return textSources.find(t => t.id === id)
}

exports.generateSourcePDF = generateSourcePDF
exports.generateSourceMultiplePDF = generateSourceMultiplePDF
exports.findSourceById = findSourceById