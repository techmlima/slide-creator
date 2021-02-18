import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: 'white',
    margin: 12,
    fontSize: 40,
    textAlign: 'center',
    fontFamily: 'Times-Roman'
  }
});

const MyDocument: React.FC<{ documentSource: string[] }> = ({ documentSource }) => {
  return (
    <Document>
      {documentSource.map(text => {
        return (
          <Page orientation='landscape' size="A5" style={styles.page}>
            <View>
              <Text style={styles.text}>{text}</Text>
            </View>
          </Page>
        )
      })}
    </Document>
  );
};

export default MyDocument