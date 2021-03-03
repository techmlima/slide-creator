import React, { useState } from 'react'
import Layout from '../../components/Layout'
import Router from 'next/router'
import { Button } from 'react-bootstrap'

const Create: React.FC = () => {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { title, text }
      await fetch('/api/text-source', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      await Router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1>Nova Música</h1>
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título"
            type="text"
            value={title}
          />
          <textarea
            cols={50}
            onChange={(e) => setText(e.target.value)}
            placeholder="Conteúdo"
            rows={8}
            value={text}
          />

          <div className="row">
            <div className="col d-flex justify-content-end">
              <Button variant="success" type="submit" disabled={!text || !title}>
                Salvar
            </Button>
              <Button variant="primary" className="ml-2" onClick={() => Router.push('/')}>
                Cancelar
            </Button>
            </div>
          </div>

        </form>
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type='text'],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
        }

        input[type='submit'] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

        .back {
          margin-left: 1rem;
        }
      `}</style>
    </Layout>
  )
}

export default Create