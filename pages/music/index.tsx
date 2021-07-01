
import prisma from '../../services/prisma/prisma'
import { getSession } from "next-auth/client"
import React, { useState } from "react"
import { PdfStyleSheet } from "../../components/Modal/pdf/ConfigPreferencesPDF"
import MusicTable, { MusicTableProps } from "../../components/Music/MusicTable"
import { OrganizationModel } from "../../prisma/models/Organization"
import NavBar from "../../components/Nav/NavBar"
import FilterList from "../../components/List/FilterList"
import Layout from "../../components/Layout/Layout"
var pdfUtil = require('../../util/pdf-util')

type Props = {
    musics: MusicTableProps[],
    configPreferences: PdfStyleSheet,
    hasOrganization: boolean,
    organizations: OrganizationModel[]
}

export const getServerSideProps = async (context) => {
    const session = await getSession(context)
    const organizationId = (session?.user as any)?.organizationId || -1;
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


const MusicPage: React.FC<Props> = (props) => {
    const [textsFilter, setTextsFilter] = useState(props.musics)
    const [musicsSelect, setMusicsSelect] = useState([])
    const [spinner, showSpinner] = useState(false)

    const changeOrderList = (list: MusicTableProps[]) => {
        let listFilter = [];
        list.forEach(item => listFilter.push(props.musics.find(t => t.id === Number(item.id))))
        setMusicsSelect(listFilter);
    }

    const handleChange = (e, id: number) => {
        pdfUtil.findSourceById(props.musics, id).isCreatePDF = e.target.checked
        setMusicsSelect(props.musics.filter(item => item.isCreatePDF))
    }

    return (
        <Layout>
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="d-flex btn-music">
                            <NavBar musicsSelect={musicsSelect} configPreferences={props.configPreferences} changeOrderList={changeOrderList} showSpinner={showSpinner} />
                        </div>
                        <div className="d-flex justify-content-end flex-grow-1 mt-1">
                            <FilterList placeholder='Encontrar música' list={props.musics}
                                handleChange={(listFilter: MusicTableProps[]) => setTextsFilter(listFilter)} />
                        </div>
                    </div>

                    <div className="row mt-1">
                        <MusicTable musics={textsFilter} onChange={handleChange} />
                    </div>
                </div>
            </div>
        </Layout>
    )

}
export default MusicPage
