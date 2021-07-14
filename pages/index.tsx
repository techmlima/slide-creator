import React, { useState } from "react"
import prisma from '../services/prisma/prisma'
import { getSession, useSession } from "next-auth/client"
import SpinnerLoading from "../components/SpinnerLoading"
import { OrganizationModel } from "../prisma/models/Organization"
import OrganizationModal from "../components/Modal/organization/OrganizationModal"
import Timeline from "../components/Timeline/Timeline"

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
    <>
      {loading || spinner ? (<SpinnerLoading />) : (null)}
      <>
        <div className="jumbotron jumbotron-fluid text-center bg-turquoise mt-1">
          <div className="container">
            <h1 className="display-4">Seja bem-vindo ao <strong>Slide Creator</strong>!</h1>
            <p className="lead">
              Aqui você poderá cadastras suas músicas preferidas e gerar slides para sua congregação. Fácil assim.
            </p>
          </div>
        </div>

        <div className="mt-n4">
          <Timeline />
        </div>
      </>

      {props.hasOrganization || !session ? (null) : (
        <OrganizationModal show={modalShowOrganization} organizations={props.organizationsList} />
      )}
    </>
  )

}
export default Home
