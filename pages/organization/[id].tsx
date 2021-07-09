import React from "react"
import { OrganizationModel } from "../../prisma/models/Organization"
import prisma from '../../services/prisma/prisma'
import Create from "./create"

export const getServerSideProps = async ({ query }) => {
  const organization = await prisma.organization.findUnique({
    where: { id: Number(query.id) }
  })

  return {
    props: organization
  }
}

const MusicDetail: React.FC<OrganizationModel> = (props) => {
  return (
    <Create props={props}/>
  )
}

export default MusicDetail
