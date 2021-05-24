import React from "react"
import { OrganizationModel } from "../../prisma/models/Organization"
import prisma from '../../services/prisma/prisma'
import Create from "./create"


type Props = {
  organizationSelected: OrganizationModel,
  organizations: OrganizationModel[]
}

export const getServerSideProps = async ({ query }) => {
  const organization = await prisma.organization.findUnique({
    where: { id: Number(query.id) }
  })

  return {
    props: {organizationSelected: organization} 
  }
}

const MusicDetail: React.FC<Props> = (props) => {
  return (
    <Create props={props}/>
  )
}

export default MusicDetail
