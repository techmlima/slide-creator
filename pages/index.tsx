import React, { useEffect, useState } from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import prisma from '../lib/prisma'
import TextSource, { TextSourceProps } from "../components/TextSource"
import Router from "next/router"
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import MyDocument from "../lib/pdf/pdf-document"

var pdfUtil = require('../util/pdf-util');

export const getStaticProps: GetStaticProps = async () => {
  const texts = await prisma.textSource.findMany()
  return { props: { texts } }
}

type Props = {
  texts: TextSourceProps[]
}

const Home: React.FC<Props> = (props) => {
  const [isClient, setIsClient] = useState(false)
  const [texts, setTexts] = useState({})
  const [documentSource, setDocumentSource] = useState([])

  useEffect(() => {
    setIsClient(true)
  }, [])

const handleChange = (e, id) => {
  setTexts({
    ...texts,
    [e.target.name]: e.target.checked
  })

  pdfUtil.findSourceById(props.texts, id).isCreatePDF = e.target.checked;  
  setDocumentSource(pdfUtil.generateSourceMultiplePDF(props.texts, '\n\n'))
}


  return (
    <Layout>
      <div>
        <h1>Textos</h1>
        <button onClick={() => Router.push("/text-source/create")}>Novo</button>
        
        <main>
          {props.texts.map((textSource) => (
            <div key={textSource.id} className="layout-text">
              <TextSource textSource={textSource} onChange={handleChange}/>
            </div>            
          ))}                 

          <div>
              {isClient && documentSource.length > 0 ? (
                <PDFDownloadLink document={ <MyDocument documentSource={documentSource}/> } fileName="Documento.pdf">
                  {({ blob, url, loading, error }) => (loading ? 'Carregando Documento...' : 'Download PDF')}
                </PDFDownloadLink> 
              ): null}
          </div>
          
          <hr className='mt-2'/>
          <h1>Área de teste</h1>
          <div>
            {isClient && documentSource.length > 0 ? (
              <PDFViewer>
                <MyDocument documentSource={documentSource}/>
              </PDFViewer>
            ) : null}
          </div>
        </main>
      </div>
      <style jsx>{`
        mt-2{
          margin-top: 2rem;
        }

        .layout-text {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .layout-text:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .layout-text + .layout-text {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export default Home
