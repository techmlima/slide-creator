import React, { useState } from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import prisma from '../lib/prisma'
import TextSource, { TextSourceProps } from "../components/TextSource"
import Router from "next/router"
import { PDFDownloadLink } from '@react-pdf/renderer'
import MyDocument from "../lib/pdf/pdf-document"
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap"
import { Download, Eye, PlusCircle, Trash } from "react-bootstrap-icons"
import ModalPDFView from "../components/ModalPDFView"

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
  const [modalShow, setModalShow] = React.useState(false);

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

//TODO: CRIAR COMPONENTE PARA OS BOTÕES 

  return (
    <Layout>
      <div>
        <main>
          <div className='row'>
            <div className="col">
              <h1>Textos</h1>
            </div>

            <div className="row">
              <div className='nav-button'>
                {documentSource.length > 0 ? (
                  <PDFDownloadLink document={<MyDocument documentSource={documentSource} />} fileName="Documento.pdf">
                    {({ blob, url, loading, error }) => (loading ? '...' :
                      <div className='btn btn-info' >
                        <Download />
                      </div>
                    )}
                  </PDFDownloadLink>
                ) : null}
              </div>

              <OverlayTrigger
                key='top'
                placement='top'
                overlay={
                  <Tooltip id={`tooltip-top`}>
                    Deletar um ou mais textos
                </Tooltip>
                }
              >
                <div className='nav-button'>
                  <Button onClick={deleteText} variant="danger" disabled={documentSource.length === 0}
                    className='nav-button'>
                    <Trash />
                  </Button>
                </div>
              </OverlayTrigger>


              <div className='nav-button'>
                <Button className='nav-button' disabled={documentSource.length === 0} variant="primary" onClick={() => setModalShow(true)}>
                  <Eye />
                </Button>

                <ModalPDFView documentSource={documentSource} show={modalShow} onHide={() => setModalShow(false)} />
              </div>

              <div className='nav-button mr-3'>
                <Button onClick={() => Router.push("/text-source/create")}
                  variant="success">
                  <PlusCircle />
                </Button>
              </div>
            </div>
            <style jsx>{`
                .nav-button {
                  padding-right: 0.2rem;
                  padding-left: 0.2rem;
                }
            `}</style>
          </div>

          <TextSource textsSource={props.texts} onChange={handleChange} />
        </main>
      </div>
    </Layout>
  )
}

export default Home
