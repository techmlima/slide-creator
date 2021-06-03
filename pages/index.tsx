import React, { useState } from "react"
import Layout from "../components/Layout"
import prisma from '../services/prisma/prisma'
import NavBar from "../components/Nav/NavBar"
import FilterList from "../components/List/FilterList"
import { getSession, useSession } from "next-auth/client"
import Unauthorized from "../components/Unauthorized"
import SpinnerLoading from "../components/SpinnerLoading"
import { PdfStyleSheet } from "../components/Modal/pdf/ConfigPreferencesPDF"
import MusicTable, { MusicTableProps } from "../components/MusicTable"
import { OrganizationModel } from "../prisma/models/Organization"
import OrganizationModal from "../components/Modal/organization/OrganizationModal"
var pdfUtil = require('../util/pdf-util')

type Props = {
  musics: MusicTableProps[],
  configPreferences: PdfStyleSheet,
  hasOrganization: boolean,
  organizations: OrganizationModel[]
}

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req })
  const organizationId = (session?.user as any)?.organizationId | -1;
  const hasOrganization = (organizationId !== -1);

  const musics = await prisma.music.findMany({
    where: {
      user: { organizationId: organizationId }
    }
  })

  const configPreferences = await prisma.configurationPreferencesPDF.findUnique({
    where: { organizationId: organizationId }
  })

  const organizations = await prisma.organization.findMany();

  return {
    props: {
      //Orderna as musicas pelo títulos
      musics: musics.sort((m1, m2) => m1.title.localeCompare(m2.title)),
      configPreferences,
      hasOrganization,
      organizations
    }
  }
}

const Home: React.FC<Props> = (props) => {
  const [session, loading] = useSession();
  const [textsFilter, setTextsFilter] = useState(props.musics)
  const [musicsSelect, setMusicsSelect] = useState([])
  const [spinner, showSpinner] = useState(false)
  const [hasOrganization] = useState(props.hasOrganization)
  const [modalShowOrganization, setModalShowOrganization] = useState(!props.hasOrganization);

  const handleChange = (e, id: number) => {
    pdfUtil.findSourceById(props.musics, id).isCreatePDF = e.target.checked
    setMusicsSelect(props.musics.filter(item => item.isCreatePDF))
  }

  const changeOrderList = (list: MusicTableProps[]) => {
    let listFilter = [];
    list.forEach(item => listFilter.push(props.musics.find(t => t.id === Number(item.id))))
    setMusicsSelect(listFilter);
  }

  const saveUserInOrganization = () => {
    console.log('Salvar organização');
    
    setModalShowOrganization(false)

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
              <NavBar musicsSelect={musicsSelect} configPreferences={props.configPreferences} changeOrderList={changeOrderList} showSpinner={showSpinner} />
            </div>
            <div className="col-12 d-flex justify-content-end mt-1">
              <FilterList placeholder='Filtro' list={props.musics}
                handleChange={(listFilter: MusicTableProps[]) => setTextsFilter(listFilter)} />
            </div>
          </div>

          <div className="row mt-1">
            <MusicTable musics={textsFilter} onChange={handleChange} />
          </div>
        </div>
      )}

      {hasOrganization ? (null) : (
        <OrganizationModal show={modalShowOrganization} onHide={() => {}} organizations={props.organizations}/>
      )}
    </Layout>
  )

}
export default Home
