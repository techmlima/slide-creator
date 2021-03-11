import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { Button, Collapse, Modal } from "react-bootstrap";
import { Download, Gear } from "react-bootstrap-icons";
import MyDocument from "../../pdf/PdfDocument";
import DragAndDrop from "../../DragAndDrop";
import { TextSourceProps } from "../../TextSource";
import { useState } from "react";
import TooltipElement from "../../TooltipElement";
import ConfigPreferencesPDF, { PdfStyleSheet } from "./ConfigPreferencesPDF";


const ModalPDFView: React.FC<{ show, onHide, textsSelected: TextSourceProps[], changeOrderList, configPreferencesDefault: PdfStyleSheet }> = ({ show, onHide, textsSelected, changeOrderList, configPreferencesDefault }) => {
    const [showConfig, setShowConfig] = useState(false);
    const [pdfStyleSheet, setPdfStyleSheet] = useState(configPreferencesDefault);

    return (
        <Modal
            onHide={onHide}
            show={show}
            dialogClassName="modal-custom"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Pré-visualizar PDF
                    </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container-fluid h-100">
                    <div className="row h-100">
                        <div className="col">
                            <PDFViewer>
                                <MyDocument textSource={textsSelected} pdfStyleSheet={pdfStyleSheet} />
                            </PDFViewer>
                        </div>
                        <div className="col-4 border-left">
                            <TooltipElement keyName='topConfigPDF' placement='top' text='Configurações do PDF'
                                component={(
                                    <Button
                                        variant='info'
                                        className='ml-1 mb-1'
                                        onClick={() => setShowConfig(!showConfig)}
                                        aria-controls="collapse-config-pdf"
                                        aria-expanded={showConfig}
                                    >
                                        <Gear />
                                    </Button>
                                )}>
                            </TooltipElement>

                            <Collapse in={showConfig}>
                                <div id="collapse-config-pdf">
                                    <ConfigPreferencesPDF pdfStyleSheet={pdfStyleSheet} setPdfStyleSheet={setPdfStyleSheet} />
                                    <hr />
                                </div>
                            </Collapse>

                            <DragAndDrop textsSource={textsSelected} changeOrderList={changeOrderList} />
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <PDFDownloadLink className="ml-2" document={<MyDocument textSource={textsSelected} pdfStyleSheet={pdfStyleSheet} />} fileName="Documento.pdf">
                    {({ blob, url, loading, error }) => (loading ? '...' :
                        <div className='btn btn-info' >
                            Download PDF <Download className="mb-1" />
                        </div>
                    )}
                </PDFDownloadLink>
                <Button onClick={onHide}>Fechar</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalPDFView;