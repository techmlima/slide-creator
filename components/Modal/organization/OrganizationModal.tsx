import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import TooltipElement from "../../TooltipElement";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const OrganizationModal: React.FC<{ show: boolean; organizations: { id: number; name: string }[] }> = ({ show, organizations }) => {
    const [organizationIdSelected, setOrganizationIdSelected] = useState('');
    const { data: session } = useSession();
    const [spinner, showSpinner] = useState(false);
    const router = useRouter();

    const saveOrganization = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            showSpinner(true);
            await fetch(`/api/user/alter-organization-user/${(session?.user as any)?.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ organizationId: Number(organizationIdSelected) }),
            }).then(() => {
                showSpinner(false);
                toast.success("Solicitação efetuada, aguarde a aprovação dos administradores.");
            });
        } catch (error) {
            console.error(error);
            toast.error("Ocorreu um erro ao salvar a solicitação.");
            showSpinner(false);
        }
    };

    return (
        <Modal
            show={show}
            size="lg"
            aria-labelledby="basic-modal-center"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="basic-modal-center">
                    Selecione ou cadastre uma Congregação
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row>
                        <Form.Group as={Col} controlId="formOrganization">
                            <Form.Label>Congregação</Form.Label>
                            <Form.Control
                                as="select"
                                value={organizationIdSelected}
                                onChange={(e) => setOrganizationIdSelected(e.target.value)}
                            >
                                <option key="listOrgBlank" value=''>{""}</option>
                                {organizations.map((org, index) => (
                                    <option key={`listOrg${index}`} value={org.id}>{org.name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Row>
                </Form>

                <div className="w-100 d-flex justify-content-end">
                    <Button
                        variant="success"
                        onClick={saveOrganization}
                        disabled={!organizationIdSelected || spinner}
                    >
                        {spinner ? "Salvando..." : "Salvar"}
                    </Button>
                </div>
            </Modal.Body>
            <Modal.Footer className="text-left">
                <div className="w-100 d-flex justify-content-start" style={{ alignItems: "center" }}>
                    <div className="text-muted">Caso não encontre sua congregação clique em: </div>
                    <TooltipElement
                        keyName="topOrgForm2"
                        placement="top"
                        text="Cadastrar Congregação"
                        component={
                            <Button onClick={() => router.push(`/organization/create`)} variant="primary">
                                Criar nova Congregação
                            </Button>
                        }
                    />
                </div>
            </Modal.Footer>
        </Modal>
    );
};

export default OrganizationModal;
