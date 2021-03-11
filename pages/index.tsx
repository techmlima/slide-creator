import React, { useState } from "react"
import Layout from "../components/Layout"
import prisma from '../lib/prisma'
import NavBar from "../components/Nav/NavBar"
import FilterList from "../components/List/FilterList"
import { getSession, useSession } from "next-auth/client"
import Unauthorized from "../components/Unauthorized"
import SpinnerLoading from "../components/SpinnerLoading"
import { PdfStyleSheet } from "../components/Modal/pdf/ConfigPreferencesPDF"
import MusicTable, { MusicTableProps } from "../components/MusicTable"
var pdfUtil = require('../util/pdf-util')

type Props = {
  texts: MusicTableProps[],
  configPreferences: PdfStyleSheet
}

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req })  
  const organizationId = (session?.user as any)?.organizationId | 0;

  const texts = await prisma.music.findMany({
    where:{ 
      user: { organizationId: organizationId }
    }
  })

  const configPreferences = await prisma.configurationPreferencesPDF.findUnique({
      where: { organizationId: organizationId }
  })
  
  return { props: { texts, configPreferences } } 
}

const Home: React.FC<Props> = (props) => {
  const [session, loading] = useSession();
  const [textsFilter, setTextsFilter] = useState(props.texts)
  const [musicsSelect, setMusicsSelect] = useState([])
  const [spinner, showSpinner] = useState(false)

  const handleChange = (e, id: number) => {
    pdfUtil.findSourceById(props.texts, id).isCreatePDF = e.target.checked
    setMusicsSelect(props.texts.filter(item => item.isCreatePDF))
  }

  const changeOrderList = (list: MusicTableProps[]) => {
    let listFilter = [];
    list.forEach(item => listFilter.push(props.texts.find(t => t.id === Number(item.id))))
    setMusicsSelect(listFilter);
  }

  return (
    <Layout>
      {loading || spinner ? (<SpinnerLoading />) : (null)}
      {!loading && !session ? (<Unauthorized />) : (
        <div>
          <div className='row position-absolute'>
            <div className="col">
              <h3>Músicas</h3>
            </div>
          </div>

          <div className="row">
            <div className="col-12 d-flex justify-content-end">
              <NavBar musicsSelect={musicsSelect} configPreferences={props.configPreferences} changeOrderList={changeOrderList} showSpinner={showSpinner}/>
            </div>
            <div className="col-12 d-flex justify-content-end mt-1">
              <FilterList placeholder='Filtro' list={props.texts}
                handleChange={(listFilter: MusicTableProps[]) => setTextsFilter(listFilter)} />
            </div>
          </div>

          <div className="row mt-1">
            <MusicTable musics={textsFilter} onChange={handleChange} />
          </div>
        </div>
      )}
    </Layout>
  )

}
export default Home
