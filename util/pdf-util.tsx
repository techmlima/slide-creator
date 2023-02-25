import { MusicTableProps } from "../components/Music/MusicTable";


export function generateSourcePDF(music: MusicTableProps, splitValue: string) {
    return [music?.title].concat(music?.text.split(splitValue));
}

export function generateSourceMultiplePDF(musics: MusicTableProps[], splitValue: string) {
    let arrayRetorno = [];
    musics.filter(textS => textS.isCreatePDF)
      .map(t => ([`Música:\n${t.title}`].concat(t?.text.split(splitValue))))
      .forEach(t => arrayRetorno = arrayRetorno.concat(t))  
  
    return arrayRetorno;
}

export function findSourceById(musics: MusicTableProps[], id: number):MusicTableProps {
  return musics.find(t => t.id === id)
}
