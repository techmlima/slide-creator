import React, { useEffect, useState } from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import prisma from '../lib/prisma'
import TextSource, { TextSourceProps } from "../components/TextSource"
import Router from "next/router"
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import MyDocument from "../lib/pdf/pdf-document"
import { Button, Table } from "react-bootstrap"
import { Download, Trash } from "react-bootstrap-icons"

var pdfUtil = require('../util/pdf-util');

export const getStaticProps: GetStaticProps = async () => {
  const texts = await prisma.textSource.findMany()
  return { props: { texts } }
}

type Props = {
  texts: TextSourceProps[]
}

const Home: React.FC<Props> = (props) => {
  const [texts, setTexts] = useState({})
  const [documentSource, setDocumentSource] = useState([])

  const handleChange = (e, id) => {
    setTexts({
      ...texts,
      [e.target.name]: e.target.checked
    })

    pdfUtil.findSourceById(props.texts, id).isCreatePDF = e.target.checked;
    setDocumentSource(pdfUtil.generateSourceMultiplePDF(props.texts, '\n\n'))
  }

  const deleteText = () => {
    console.log("vaai nãoo");
  }
  return (
    <Layout>
      <div>
        <main>
          <div className='row'>
            <div className="col">
              <h1>Textos</h1>
            </div>

            <div className="col">
            {documentSource.length > 0 ? (
                <PDFDownloadLink document={<MyDocument documentSource={documentSource} />} fileName="Documento.pdf">
                  {({ blob, url, loading, error }) => (loading ? 'Carregando Documento...' : 'Download PDF')}
                </PDFDownloadLink>
              ) : null}

              <Button onClick={deleteText} variant="danger" disabled={documentSource.length === 0}
                className=''> Deletar
                        <Trash className="mt-n1 ml-1" />
              </Button>             

              <Button onClick={() => Router.push("/text-source/create")}
                variant="success" className='float-right'>
                Novo
              </Button>
            </div>
          </div>

          <TextSource textsSource={props.texts} onChange={handleChange} />

          <div className="row">

          </div>

          <hr className='mt-2' />
          <h1>Área de teste</h1>
          <div>
            {documentSource.length > 0 ? (
              <PDFViewer>
                <MyDocument documentSource={documentSource} />
              </PDFViewer>
            ) : null}
          </div>
        </main>
      </div>
    </Layout>
  )
}

export default Home
