import { PDFDownloadLink } from "@react-pdf/renderer";
import Router from "next/router";
import { useEffect, useState } from "react";
import MyDocument from "../lib/pdf/pdf-document";

export type TextSourceProps = {
    id: number;
    title: string;
    text: string;
};

const getSourcePDF = (textSource: TextSourceProps) => {
  return [textSource?.title].concat(textSource?.text.split('\n\n'));
}

const TextSource: React.FC<{ textSource: TextSourceProps }> = ({ textSource }) => {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])
  
    return (
        <div onDoubleClick={() => Router.push("/text-source/[id]", `/text-source/${textSource.id}`)}>
            <h2>{textSource.title}</h2>
            <div>
              {isClient && (
                <PDFDownloadLink document={ <MyDocument documentSource={getSourcePDF(textSource)}/> } fileName="Documento.pdf">
                  {({ blob, url, loading, error }) => (loading ? 'Carregando Documento...' : 'Download PDF')}
                </PDFDownloadLink> 
              )}
            </div>
            
            <style jsx>
              {
                `div {
                  color: inherit;
                  padding: 1rem;
                  cursor: pointer;
                }`
              }
        </style>
        </div>
    );
};

export default TextSource;
