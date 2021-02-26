import { title } from "process";
import { Button, Modal } from "react-bootstrap";

const BasicModalCenter: React.FC<{ show, onHide, titleText: string, bodyComponent: HTMLElement }> = ({ show, onHide, titleText, bodyComponent }) => {
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
                {bodyComponent}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Fechar</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default BasicModalCenter;