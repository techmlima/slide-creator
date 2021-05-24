import React from "react"
import prisma from '../../services/prisma/prisma'
import { MusicTableProps } from "../../components/MusicTable"
import Create from "./create"

export const getServerSideProps = async ({ query }) => {
  const music = await prisma.music.findUnique({
    where: { id: Number(query.id) }
  })

  return {
    props: music 
  }
}

const MusicDetail: React.FC<MusicTableProps> = (props) => {
  return (
    <Create props={props}/>
  )
}

export default MusicDetail
