import { Button, Modal } from "react-bootstrap";

const BasicConfirmModalCenter: React.FC<{ show, onHide, titleText: string, message: string, confirmAction }> = ({ show, onHide, titleText, message, confirmAction }) => {
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
                    {titleText}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {message}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Não</Button>
                <Button variant="danger" onClick={confirmAction}>Sim</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default BasicConfirmModalCenter;