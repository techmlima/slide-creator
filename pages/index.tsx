import React, { useState } from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import prisma from '../lib/prisma'
import TextSource, { TextSourceProps } from "../components/TextSource"
import NavBar from "../components/Nav/NavBar"
import FilterList from "../components/FilterList"

var pdfUtil = require('../util/pdf-util');

export const getStaticProps: GetStaticProps = async () => {
  const texts = await prisma.textSource.findMany()
  return { props: { texts } }
}

type Props = {
  texts: TextSourceProps[]
}

const Home: React.FC<Props> = (props) => {
  const [textsFilter, setTextsFilter] = useState(props.texts)
  const [documentSource, setDocumentSource] = useState([])


  const handleChange = (e, id: number) => {
    pdfUtil.findSourceById(props.texts, id).isCreatePDF = e.target.checked;
    setDocumentSource(pdfUtil.generateSourceMultiplePDF(props.texts, '\n\n'))
  }

  const handleChangeFilter = (listFilter: TextSourceProps[]) => {  
    setTextsFilter(listFilter);
    
  }

  return (
    <Layout>
      <>
        <div className='row'>
          <div className="col">
            <h1>Músicas</h1>
          </div>
          <div className="container">
            <NavBar documentSource={documentSource} />
          </div>
        </div>

        
        <FilterList placeholder='Filtro' list={props.texts} handleChange={handleChangeFilter} />
        <TextSource textsSource={textsFilter} onChange={handleChange} />
      </>
    </Layout>
  )
}

export default Home
