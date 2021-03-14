import { MusicTableProps } from "../components/MusicTable";


const generateSourcePDF = (music: MusicTableProps, splitValue: string) => {
    return [music?.title].concat(music?.text.split(splitValue));
}

const generateSourceMultiplePDF = (musics: MusicTableProps[], splitValue: string) => {
    let arrayRetorno = [];
    musics.filter(textS => textS.isCreatePDF)
      .map(t => ([`Música:\n${t.title}`].concat(t?.text.split(splitValue))))
      .forEach(t => arrayRetorno = arrayRetorno.concat(t))  
  
    return arrayRetorno;
}

const findSourceById = (musics: MusicTableProps[], id: number):MusicTableProps => {
  return musics.find(t => t.id === id)
}

exports.generateSourcePDF = generateSourcePDF
exports.generateSourceMultiplePDF = generateSourceMultiplePDF
exports.findSourceById = findSourceById