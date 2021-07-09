import React, { useState } from 'react'
import Router, { useRouter } from 'next/router'
import { Button, Col, Form } from 'react-bootstrap'
import Unauthorized from '../../components/Unauthorized'
import { useSession } from 'next-auth/client'
import SpinnerLoading from '../../components/SpinnerLoading'
import { toast } from 'react-toastify'
import { MusicTableProps } from '../../components/Music/MusicTable'

const Create: React.FC<{ props: MusicTableProps }> = ({ props }) => {
  const router = useRouter()
  const [session, loading] = useSession()
  const [spinner, showSpinner] = useState(false)

  const [title, setTitle] = useState(props?.title ? props?.title : '')
  const [text, setText] = useState(props?.text ? props?.text : '')
  const [id] = useState(props?.id ? props?.id : '')
  const [pageTitle] = useState(id ? 'Alterar' : 'Cadastrar');

  const submitData = async (e: React.SyntheticEvent) => {
    showSpinner(true)
    e.preventDefault()
    try {
      const body = { id, title, text, userId: (session?.user as any)?.id | 0 }
      const input = id ? `/api/music/${id}` : '/api/music';
      const method = id ? 'PUT' : 'POST';

      await fetch(input, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }).finally(() => finallySubmit(method))

    } catch (error) {
      console.error(error)
    }
  }

  const finallySubmit = async (method: string) => {
    showSpinner(false)

    if (method === 'PUT') {
      toast.success("Atualizado. Redirecionando...")
      setTimeout(() => Router.push('/music'), 2000);
    } else {
      toast.success("Salvo com sucesso. Continue Cadastrando!")
      setTitle('')
      setText('')
    }
  }

  return (
    <>
      {spinner ? (<SpinnerLoading />) : (null)}
      {!loading && !session ? (<Unauthorized />) : (
        <div className="card shadow p-2">
           <h5>{pageTitle} música</h5>
           <Form onSubmit={submitData} >
            <Form.Row>
              <Form.Group as={Col} controlId="formTitle">
                <Form.Label>Título</Form.Label>
                <Form.Control type="text" value={title}
                  onChange={(e) => setTitle(e.target.value)} />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formText">
                <Form.Label>Letra</Form.Label>
                <Form.Control as="textarea" value={text} rows={text?.split('\n').length} className="custom-textarea"
                  onChange={(e) => setText(e.target.value)} />
              </Form.Group>
            </Form.Row>

            <div className="row">
              <div className="col d-flex justify-content-end">
                <Button variant="success" type="submit" disabled={!title || !text}>
                  Salvar
                  </Button>
                <Button variant="secondary" className="ml-2" onClick={router.back}>
                  Cancelar
                  </Button>
              </div>
            </div>
          </Form>       
     
          <style jsx>{`
            .page {
              background: white;
              padding: 3rem;
              display: flex;
              justify-content: center;
              align-items: center;
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
        </div>
      )}
    </>
  )
}

export default Create