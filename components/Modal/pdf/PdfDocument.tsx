import React from 'react';
import { Page, Text, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { MusicTableProps } from '../../MusicTable';
import { PdfStyleSheet } from './ConfigPreferencesPDF';
var pdfUtil = require('../../../util/pdf-util');


const initStyleSheet = (pdfStyleSheet) => {
  return StyleSheet.create({
    page: {
      backgroundColor: pdfStyleSheet?.backgroundColor ? pdfStyleSheet?.backgroundColor : 'black',
      justifyContent: 'center'
    },
    text: {
      color: pdfStyleSheet?.fontColor,
      margin: 12,
      fontSize: pdfStyleSheet?.fontSize,
      textAlign: 'center',
      fontFamily: pdfStyleSheet?.fontFamily
    },
    image: {
      width: "100%",
      height: "140%",
      justifyContent: 'center'
    }
  })
}

const MyDocument: React.FC<{ musics: MusicTableProps[], configPreferencesDefault?: PdfStyleSheet, selectedImage? }> = ({ musics, configPreferencesDefault, selectedImage }) => {
  const styles = initStyleSheet(configPreferencesDefault);
  const documentSource = pdfUtil.generateSourceMultiplePDF(musics, configPreferencesDefault?.delimiter);

  return (
    <Document>
      {documentSource.map((text, index) => {
        return (
          <Page key={`page${index}`} orientation='landscape' size={configPreferencesDefault?.size ? configPreferencesDefault.size : "A5"} style={styles.page} wrap>
            {index === 0  && selectedImage? ( <Image key={`image${index}`} style={styles.image} src={selectedImage}></Image> ) : null}
            <Text key={`text${index}`} style={styles.text}>{text}</Text>
          </Page>
        )
      })}
    </Document>
  );
};

export default MyDocument