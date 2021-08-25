import React from 'react';
import { Page, Text, Document, StyleSheet, Image, View } from '@react-pdf/renderer';
import { MusicTableProps } from '../../Music/MusicTable';
import { PdfStyleSheet } from './ConfigPreferencesPDF';
var pdfUtil = require('../../../util/pdf-util');


const initStyleSheet = (pdfStyleSheet) => {
  return StyleSheet.create({
    page: {
      backgroundColor: pdfStyleSheet?.backgroundColor ? pdfStyleSheet?.backgroundColor : 'black',
      justifyContent: 'center',
    },
    text: {
      color: pdfStyleSheet?.fontColor,
      margin: 12,
      fontSize: pdfStyleSheet?.fontSize,
      textAlign: 'center',
      fontFamily: pdfStyleSheet?.fontFamily
    },
    image: {
      width: pdfStyleSheet?.imageWidth + "%",
      height: pdfStyleSheet?.imageHeight + "%",
      display: "table",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      margin: "0 auto",
    },
    view:{
      display: "table",
      alignItems: "center",
      textAlign: "center"
    }
  })
}

const MyDocument: React.FC<{ musics: MusicTableProps[], configPreferencesDefault?: PdfStyleSheet, selectedImage?}> = ({ musics, configPreferencesDefault, selectedImage }) => {
  const styles = initStyleSheet(configPreferencesDefault);
  let documentSource = pdfUtil.generateSourceMultiplePDF(musics, configPreferencesDefault?.delimiter);
  const IMAGE = "___IMAGE_PAGE_SELECTED";

  //TODO: deve ser excluído quando a imagem estiver sendo salva no DB
  if (!selectedImage) {    
    styles.image.width = "70%"
    styles.image.height = "100%"
    const temporaryImage = require("./temporary-image.json")
    selectedImage = temporaryImage.value
  }

  if (selectedImage)
    documentSource = [IMAGE, ...documentSource]

  return (
    <Document>
      {documentSource.map((text, index) => {
        return (
          <Page key={`page${index}`} orientation='landscape' size={configPreferencesDefault?.size ? configPreferencesDefault.size : "A5"} style={styles.page} wrap>
            {text === IMAGE && selectedImage ? 
            (<View style={styles.view}>
              <Image key={`image${index}`} style={styles.image} src={selectedImage}></Image>
            </View>)
              : <Text key={`text${index}`} style={styles.text}>{text}</Text>}
          </Page>
        )
      })}
    </Document>
  );
};

export default MyDocument