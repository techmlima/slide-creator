import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { Button, Modal } from "react-bootstrap";
import { Download } from "react-bootstrap-icons";
import MyDocument from "../../lib/pdf/pdf-document";
  
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
                <div className="row">
                    <div className="col-9">
                        <PDFViewer>
                            <MyDocument documentSource={documentSource} />
                        </PDFViewer>
                    </div>
                    <div className="col">
                        <div className="d-flex flex-row-reverse">
                            <PDFDownloadLink document={<MyDocument documentSource={documentSource} />} fileName="Documento.pdf">
                                    {({ blob, url, loading, error }) => (loading ? '...' :
                                        <div className='btn btn-info' >
                                            <Download />
                                        </div>
                                    )}
                            </PDFDownloadLink>
                        </div>
                        <div className="row">
                                jslfjaslkdfk
                        </div>
                    </div>
                </div>
               
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Fechar</Button>
            </Modal.Footer>
        </Modal>        
    );
}

export default ModalPDFView;