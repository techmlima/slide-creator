import React, { useState } from 'react'
import Layout from '../../components/Layout'
import Router from 'next/router'
import { Button, Col, Form } from 'react-bootstrap'
import Unauthorized from '../../components/Unauthorized'
import { useSession } from 'next-auth/client'
import SpinnerLoading from '../../components/SpinnerLoading'
import { toast } from 'react-toastify'
import { OrganizationModel } from '../../prisma/models/Organization'

type Props = {
  organizationSelected: OrganizationModel,
  organizations: OrganizationModel[]
}

const Create: React.FC<{ props: Props }> = ({ props }) => {
  const [session, loading] = useSession();
  const [spinner, showSpinner] = useState(false)

  const [name, setName] = useState(props?.organizationSelected?.name ? props.organizationSelected?.name : null)
  const [email, setEmail] = useState(props?.organizationSelected?.email ? props.organizationSelected?.email : null)
  const [id] = useState(props?.organizationSelected?.id)

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
    const msg = method === 'PUT' ? "Atualizado. Redirecionando..." : "Salvo com sucesso."
    toast.success(msg)
    await Router.push('/')
  }

  return (
    <Layout>
      {spinner ? (<SpinnerLoading />) : (null)}
      {!loading && !session ? (<Unauthorized />) : (
        <>
         <h1>Nova Organização</h1>
          <Form onSubmit={saveOrganization}>
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
                <Button variant="primary" className="ml-2" onClick={() => Router.push('/')}>
                  Cancelar
                  </Button>
              </div>
            </div>
          </Form>
        </>
      )}
    </Layout>
  )
}

export default Create