import React from 'react';
import { Page, Text, Document, StyleSheet} from '@react-pdf/renderer';
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
    }
  })
}

const MyDocument: React.FC<{ musics: MusicTableProps[], configPreferencesDefault?: PdfStyleSheet }> = ({ musics, configPreferencesDefault }) => {
  const styles = initStyleSheet(configPreferencesDefault);
  const documentSource = pdfUtil.generateSourceMultiplePDF(musics, configPreferencesDefault?.delimiter);

  return (
    <Document>
      {documentSource.map((text, index) => {
        return (
          <Page key={`page${index}`} orientation='landscape' size={configPreferencesDefault?.size ? configPreferencesDefault.size : "A5"} style={styles.page} wrap>
            <Text style={styles.text}>
               {index === 0 ? 'Música:\n':''}
               {text}
            </Text>
          </Page>
        )
      })}
    </Document>
  );
};

export default MyDocument