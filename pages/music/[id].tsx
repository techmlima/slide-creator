import React from "react"
import { GetServerSideProps } from "next"
import ReactMarkdown from "react-markdown"
import Layout from "../../components/Layout"
import prisma from '../../lib/prisma'
import { MusicTableProps } from "../../components/MusicTable"

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const texts = await prisma.music.findUnique({
    where: { id: Number(query.id) }
  })

  return {
    props: texts,
  }
}

const MusicDetail: React.FC<MusicTableProps> = (props) => {
  let title = props.title
  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <ReactMarkdown source={props.text} />
      </div>
      <style jsx>{`
        p{
          white-space: break-spaces;
        }

        .page {
          background: white;
          padding: 2rem;
        }

        .actions {
          margin-top: 2rem;
        }

        button {
          background: #ececec;
          border: 0;
          border-radius: 0.125rem;
          padding: 1rem 2rem;
        }

        button + button {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  )
}

export default MusicDetail
