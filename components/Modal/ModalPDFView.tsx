import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { Button, Modal } from "react-bootstrap";
import { Download } from "react-bootstrap-icons";
import MyDocument from "../../lib/pdf/pdf-document";
import DragAndDrop from "../DragAndDrop";
import { TextSourceProps } from "../TextSource";

const ModalPDFView: React.FC<{ show, onHide, textsSelected: TextSourceProps[] }> = ({ show, onHide, textsSelected }) => {
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
                    <div className="col-5">
                        <PDFViewer>
                            <MyDocument textSource={textsSelected} />
                        </PDFViewer>
                    </div>
                    <div className="col border-left">
                        <div className="row">
                            <div className="col">
                                <PDFDownloadLink document={<MyDocument textSource={textsSelected} />} fileName="Documento.pdf">
                                    {({ blob, url, loading, error }) => (loading ? '...' :
                                        <div className='btn btn-info' >
                                            <Download />
                                        </div>
                                    )}
                                </PDFDownloadLink>

                                <div className="col">
                                    <DragAndDrop textSource={textsSelected}/>
                                </div>
                            </div>
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