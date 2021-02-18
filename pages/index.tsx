import React, { useEffect, useState } from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import prisma from '../lib/prisma'
import TextSource, { TextSourceProps } from "../components/TextSource"
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import MyDocument from "../lib/pdf/pdf-document"

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

  return (
    <Layout>
      <div className="page">
        <h1>Textos</h1>
        <main>
          {props.feed.map((text) => (
            <div key={text.id} className="post">
             
              <TextSource textSource={text} />
            </div>            
          ))}
          
          <div>
            {isClient && (
              <PDFDownloadLink document={ <MyDocument /> } fileName="Documento.pdf">
                {({ blob, url, loading, error }) => (loading ? 'Carregando Documento...' : 'Download PDF')}
              </PDFDownloadLink> 
            )}
          </div>

          <div>
            {isClient && (
              <PDFViewer>
                <MyDocument />
              </PDFViewer>
            )}
          </div>
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export default Home
