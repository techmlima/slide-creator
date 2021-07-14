import React from "react"
import prisma from '../../services/prisma/prisma'
import { MusicTableProps } from "../../components/Music/MusicTable"
import Create from "./create"
import { getSession } from "next-auth/client"
import Custom404 from "../404"

export const getServerSideProps = async (context) => {
  const session = await getSession(context)
  const organizationId = (session?.user as any)?.organizationId || -1;
  
  const music = await prisma.music.findFirst({
    where: {
      id: Number(context.query.id),
      user: { organizationId: organizationId }
    }
  })

  return {
    props: music ? music : {id: -1}
  }
}

const MusicDetail: React.FC<MusicTableProps> = (props) => {
  return (<>
    {props.id === -1 ? <Custom404/> : <Create props={props}/>}
  </>)
}

export default MusicDetail
