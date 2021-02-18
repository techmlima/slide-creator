import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
    page: {
        backgroundColor: 'black'        
    },
    text: {
      color: 'white',
      margin: 12,
      fontSize: 40,
      textAlign: 'center',
      fontFamily: 'Times-Roman'
    },
    defaultCell: {
      paddingVertical: 1,
      paddingHorizontal: 3
    }
  });

// Create Document Component
const MyDocument = () => (
  <Document> 
    <Page size="A5" style={styles.page}>
      <View >
        <Text  style={styles.text}>fdf</Text>
        <Text  style={styles.text}>Sectionfdsaf sdfadfa</Text>
      </View>
        
    </Page>
    <Page size="A5" style={styles.page}>
      <View >
        <Text style={styles.text}>sdfadfasdfasdfasdfasdfsafdas</Text>
        <Text style={styles.text}>Section #2</Text>
      </View>
    </Page>
  </Document>
);

export default MyDocument