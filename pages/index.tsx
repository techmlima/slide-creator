import React, { useState } from "react"
import Layout from "../components/Layout/Layout"
import prisma from '../services/prisma/prisma'
import { getSession, useSession } from "next-auth/client"
import Unauthorized from "../components/Unauthorized"
import SpinnerLoading from "../components/SpinnerLoading"
import { OrganizationModel } from "../prisma/models/Organization"
import OrganizationModal from "../components/Modal/organization/OrganizationModal"

type Props = {
  hasOrganization: boolean,
  organizationsList: OrganizationModel[]
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context)
  const organizationId = (session?.user as any)?.organizationId || -1;
  const hasOrganization = (organizationId !== -1);

  const organizationsList = await prisma.organization.findMany();
  return {
    props: {
      hasOrganization,
      organizationsList
    }
  }
}

const Home: React.FC<Props> = (props) => {
  const [session, loading] = useSession()
  const [spinner, showSpinner] = useState(false)
  const [modalShowOrganization, setModalShowOrganization] = useState(!props.hasOrganization);

  return (
    <Layout>
      {loading || spinner ? (<SpinnerLoading />) : (null)}
      {!loading && !session ? (<Unauthorized />) : (<div> olá</div>)}

      {props.hasOrganization || !session ? (null) : (
        <OrganizationModal show={modalShowOrganization} onHide={() => { }} organizations={props.organizationsList} />
      )}
    </Layout>
  )

}
export default Home
