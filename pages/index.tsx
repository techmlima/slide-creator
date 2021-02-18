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

const getSourcePDF = (textSource: TextSourceProps) => {
  return [textSource?.title].concat(textSource?.text.split('\n\n'));
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
          {props.feed.map((textSource) => (
            <div key={textSource.id} className="layout-text">
              <TextSource textSource={textSource} />
            </div>            
          ))}                 

          <hr className='mt-2'/>
          <h1>Área de teste</h1>
          <div>
            {isClient && (
              <PDFViewer>
                <MyDocument documentSource={getSourcePDF(props.feed[1])}/>
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
