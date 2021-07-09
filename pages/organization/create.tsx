import React, { useState } from 'react'
import { Button, Col, Form } from 'react-bootstrap'
import Unauthorized from '../../components/Unauthorized'
import { useSession } from 'next-auth/client'
import SpinnerLoading from '../../components/SpinnerLoading'
import { toast } from 'react-toastify'
import { OrganizationModel } from '../../prisma/models/Organization'
import { useRouter } from 'next/router'

const Create: React.FC<{ props: OrganizationModel }> = ({ props }) => {
  const router = useRouter()
  const [session, loading] = useSession();
  const [spinner, showSpinner] = useState(false)

  const [name, setName] = useState(props?.name ? props?.name : '')
  const [email, setEmail] = useState(props?.email ? props?.email : '')
  const [id] = useState(props?.id ? props?.id : '')

  const saveOrganization = async (e: React.SyntheticEvent) => {
    showSpinner(true)
    e.preventDefault()
    try {
      const body = { id, name, email, userId: (session?.user as any)?.id | 0 }
      const input = id ? `/api/organization/${id}` : '/api/organization';
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
    const msg = method === 'PUT' ? "Atualizado com sucesso." : "Salvo com sucesso. Redirecionando..."
    toast.success(msg)

    if (method === 'POST')
      router.back()
  }

  return (
    <>
      {spinner ? (<SpinnerLoading />) : (null)}
      {!loading && !session ? (<Unauthorized />) : (
        <>
          <Form onSubmit={saveOrganization} className="card shadow p-2">
            <h5>{id ? 'Alterar' : 'Nova'} Congregação</h5>
            <Form.Row>
              <Form.Group as={Col} controlId="formName">
                <Form.Label>Nome</Form.Label>
                <Form.Control type="text" value={name}
                  onChange={(e) => setName(e.target.value)} />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formEmail">
                <Form.Label>E-mail</Form.Label>
                <Form.Control type="text" value={email}
                  onChange={(e) => setEmail(e.target.value)} />
              </Form.Group>
            </Form.Row>

            <div className="row">
              <div className="col d-flex justify-content-end">
                <Button variant="success" type="submit" disabled={!name || !email}>
                  Salvar
                </Button>
                <Button variant="secondary" className="ml-2" onClick={router.back}>
                  Cancelar
                </Button>
              </div>
            </div>
          </Form>
        </>
      )}
    </>
  )
}

export default Create