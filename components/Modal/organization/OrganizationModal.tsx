import { useState } from "react";
import { Button, Col, Collapse, Form, Modal } from "react-bootstrap";
import { PlusCircle } from "react-bootstrap-icons";
import TooltipElement from "../../TooltipElement";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
import { toast } from "react-toastify";

const OrganizationModal: React.FC<{ show, onHide, organizations }> = ({ show, onHide, organizations }) => {
    const [organizationIdSelected, setOrganizationIdSelected] = useState('')
    const [session, loading] = useSession()
    const [spinner, showSpinner] = useState(false)
    const router = useRouter()

    const saveOrganization = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        try {
             showSpinner(true)
            await fetch(`/api/user/alter-organization-user/${(session?.user as any)?.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ organizationId: organizationIdSelected }),
            }).then(() => {
                showSpinner(false)
                toast.success("Solicitação efetuada, aguarde a aprovação dos adminstradores.")
            })
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Modal
            onHide={onHide}
            show={show}
            size="lg"
            aria-labelledby="basic-modal-center"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="basic-modal-center">
                    Selecione ou cadastre uma Organização
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Row>
                    <Form.Group as={Col} controlId="formOrganization">
                        <Form.Label>Organização</Form.Label>
                        <Form.Control as="select" custom value={organizationIdSelected}
                            onChange={(e) =>
                                setOrganizationIdSelected(e.target.value)
                            }>

                            <option key="listOrgBlank" value=''>{""}</option>
                            {organizations.map((org, index) => (
                                <option key={`listOrg${index}`} value={org.id}>{org.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formEditar">
                        <TooltipElement keyName='topOrgForm1' placement='top' text='Editar'
                            component={!!organizationIdSelected ? (
                                <Link href={`/organization/${organizationIdSelected}`}>
                                    <a>Editar organização</a>
                                </Link>
                            ) : <div></div>}>
                        </TooltipElement>
                    </Form.Group>
                </Form.Row>
            </Modal.Body>
            <Modal.Footer>
                <TooltipElement keyName='topOrgForm2' placement='top' text='Cadastrar Organização'
                    component={(
                        <Button onClick={() => router.push(`/organization/create`)} variant="success">
                           Cadastrar Organização <PlusCircle />
                        </Button>
                    )}>
                </TooltipElement>
                <Button variant="success" onClick={saveOrganization}>Salvar</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default OrganizationModal;