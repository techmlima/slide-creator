import { PDFViewer } from "@react-pdf/renderer";
import { Button, Modal } from "react-bootstrap";
import MyDocument from "../lib/pdf/pdf-document";
  
const ModalPDFView: React.FC<{ show, onHide, documentSource }> = ({ show, onHide, documentSource }) => {
    return (
        <Modal
            onHide={onHide}
            show={show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Visualizar PDF
          </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <PDFViewer className="canvas">
                    <MyDocument documentSource={documentSource} />
                </PDFViewer>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Fechar</Button>
            </Modal.Footer>
            <style jsx>{`
             .canvas {
                width: 100% !important;
                height: auto !important;
              }
         `}</style>
        </Modal>        
    );
}

export default ModalPDFView;