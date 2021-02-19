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
  const feed = await prisma.textSource.findMany()
  return { props: { feed } }
}

type Props = {
  feed: TextSourceProps[]
}


const Home: React.FC<Props> = (props) => {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

const [state, setState] = useState({})

const handleChange = (e, id) => {
  setState({
    ...state,
    [e.target.name]: e.target.checked
  })
  pdfUtil.findSourceById(props.feed, id).isCreatePDF = e.target.checked;
  console.log(props.feed);  
}
  return (
    <Layout>
      <div>
        <h1>Textos</h1>
        <button onClick={() => Router.push("/text-source/create")}>Novo</button>
        
        <main>
          {props.feed.map((textSource) => (
            <div key={textSource.id} className="layout-text">
              <TextSource textSource={textSource} onChange={handleChange} state={state}/>
            </div>            
          ))}                 

          <div>
              {isClient && (
                <PDFDownloadLink document={ <MyDocument documentSource={pdfUtil.generateSourceMultiplePDF(props.feed, '\n\n')}/> } fileName="Documento.pdf">
                  {({ blob, url, loading, error }) => (loading ? 'Carregando Documento...' : 'Download PDF')}
                </PDFDownloadLink> 
              )}
          </div>
          
          <hr className='mt-2'/>
          <h1>Área de teste</h1>
          <div>
            {isClient && (
              <PDFViewer>
                <MyDocument documentSource={pdfUtil.generateSourceMultiplePDF(props.feed, '\n\n')}/>
              </PDFViewer>
            )}
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
