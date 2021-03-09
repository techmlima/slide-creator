import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { Button, Col, Collapse, Form, Modal } from "react-bootstrap";
import { Download, Gear } from "react-bootstrap-icons";
import MyDocument from "../pdf/PdfDocument";
import DragAndDrop from "../DragAndDrop";
import { TextSourceProps } from "../TextSource";
import { useState } from "react";
import TooltipElement from "../TooltipElement";

const colorsEnum = require("../../util/colors");

const ModalPDFView: React.FC<{ show, onHide, textsSelected: TextSourceProps[], changeOrderList }> = ({ show, onHide, textsSelected, changeOrderList }) => {
    //TODO: BUSCAR PREFERÊNCIAS DO BANCO DE DADOS
    const [showConfig, setShowConfig] = useState(false);
    const [pdfStyleSheet, setPdfStyleSheet] = useState({
        fontSize: 17,
        backgroundColor: 'black',
        fontFamily: 'Times-Roman',
        fontColor: 'white'
    });

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
                <div className="row h-100">
                    <div className="col-8">
                        <PDFViewer>
                            <MyDocument textSource={textsSelected} pdfStyleSheet={pdfStyleSheet} />
                        </PDFViewer>
                    </div>
                    <div className="col border-left">
                        <div className="row">
                            <div className="col">
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
                                        <Form.Row>
                                            <Form.Group as={Col} controlId="formTamanho">
                                                <Form.Label>Tamanho letra</Form.Label>
                                                <Form.Control type="number" min="1" max="60" value={pdfStyleSheet.fontSize}
                                                    onChange={(e) => {
                                                        const num = Number(e.target.value);
                                                        if (num >= 1 && num <= 60) {
                                                            setPdfStyleSheet({ ...pdfStyleSheet, fontSize: num })
                                                        }
                                                    }} />
                                            </Form.Group>

                                            <Form.Group as={Col} controlId="formCor">
                                                <Form.Label>Cor letra</Form.Label>
                                                <Form.Control as="select" custom value={pdfStyleSheet.fontColor}
                                                    onChange={(e) =>
                                                        setPdfStyleSheet({ ...pdfStyleSheet, fontColor: e.target.value })
                                                    }>
                                                    {colorsEnum.values().map((color, index) => (
                                                        <option key={`listCorLetra${index}`} value={color}>{colorsEnum.getNameByEnum(color)}</option>
                                                    ))}
                                                </Form.Control>
                                            </Form.Group>

                                            <Form.Group as={Col} controlId="formFundo">
                                                <Form.Label>Cor do fundo</Form.Label>
                                                <Form.Control as="select" custom value={pdfStyleSheet.backgroundColor}
                                                    onChange={(e) =>
                                                        setPdfStyleSheet({ ...pdfStyleSheet, backgroundColor: e.target.value })
                                                    }>
                                                    {colorsEnum.values().map((color, index) => (
                                                        <option key={`listFundo${index}`} value={color}>{colorsEnum.getNameByEnum(color)}</option>
                                                    ))}
                                                </Form.Control>
                                            </Form.Group>
                                        </Form.Row>
                                    </div>
                                </Collapse>

                                <DragAndDrop textsSource={textsSelected} changeOrderList={changeOrderList} />
                            </div>
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