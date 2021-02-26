import React, { useState } from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import prisma from '../lib/prisma'
import TextSource, { TextSourceProps } from "../components/TextSource"
import NavBar from "../components/Nav/NavBar"

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
  

  const handleChange = (e, id: number) => {
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
        <main>
          <div className='row'>
            <div className="col">
              <h1>Músicas</h1>
            </div>

            <NavBar documentSource={documentSource} />
          </div>

          <TextSource textsSource={props.texts} onChange={handleChange} />
        </main>
      </div>
    </Layout>
  )
}

export default Home
