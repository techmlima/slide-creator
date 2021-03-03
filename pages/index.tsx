import React, { useEffect, useState } from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import prisma from '../lib/prisma'
import TextSource, { TextSourceProps } from "../components/TextSource"
import NavBar from "../components/Nav/NavBar"
import FilterList from "../components/List/FilterList"
var pdfUtil = require('../util/pdf-util');

type Props = {
  texts: TextSourceProps[]
}

export const getServerSideProps: GetStaticProps = async () => {
  const texts = await prisma.textSource.findMany()
  return { props: { texts } }
}

const Home: React.FC<Props> = (props) => {
  const [textsFilter, setTextsFilter] = useState(props.texts)
  const [textsSelected, setTextsSelected] = useState([])

  const handleChange = (e, id: number) => {
    pdfUtil.findSourceById(props.texts, id).isCreatePDF = e.target.checked
    setTextsSelected(props.texts.filter(item => item.isCreatePDF))
  }

  const changeOrderList = (list: TextSourceProps[]) => {
    let listFilter = [];
    list.forEach(item => listFilter.push(props.texts.find(t => t.id === Number(item.id))))
    setTextsSelected(listFilter);
  }

  return (
    <Layout>
      <>
        <div className='row'>
          <div className="col">
            <h1>Músicas</h1>
          </div>
          <div className="container">
            <NavBar textsSelected={textsSelected} changeOrderList={changeOrderList}/>
          </div>
        </div>

        <div className="row mt-1">
            <FilterList placeholder='Filtro' list={props.texts}
              handleChange={(listFilter: TextSourceProps[]) => setTextsFilter(listFilter)}
            />
        </div>

        <div className="row mt-1">
          <TextSource textsSource={textsFilter} onChange={handleChange} />
        </div>
      </>
    </Layout>
  )
}

export default Home
