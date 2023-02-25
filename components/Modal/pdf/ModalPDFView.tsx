import { Button, Collapse, Modal } from "react-bootstrap";
import { Download, Gear } from "react-bootstrap-icons";
import MyDocument from "./PdfDocument";
import DragAndDrop from "../../DragAndDrop";
import { MusicTableProps } from "../../Music/MusicTable";
import { useState } from "react";
import TooltipElement from "../../TooltipElement";
import ConfigPreferencesPDF from "./ConfigPreferencesPDF";
import * as EnumColor from "../../../util/colors";
import { useSession } from "next-auth/client";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";

export const defaultPreferences = {
    id: null,
    size: 'A4',
    fontColor: EnumColor.Colors.WHITE,
    fontSize: 20,
    fontFamily: 'Times-Roman',
    backgroundColor: EnumColor.Colors.BLACK,
    imageWidth: "50",
    imageHeight: "50",
    delimiter: '\n\n'
}

const ModalPDFView: React.FC<{ show, onHide, musics: MusicTableProps[], changeOrderList, configPreferencesDefault }> = ({ show, onHide, musics, changeOrderList, configPreferencesDefault }) => {
    const [session] = useSession()
    const [selectedImage, setSelectedImage] = useState();
    const [showConfig, setShowConfig] = useState(false);
    const [pdfStyleSheet, setPdfStyleSheet] = useState(configPreferencesDefault ? configPreferencesDefault : defaultPreferences);

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
            <Modal.Body className="overflow-auto">
                <div className="container-fluid h-100">
                    <div className="row h-100">
                        <div className="col mb-1">
                            <PDFViewer>
                                <MyDocument musics={musics} configPreferencesDefault={pdfStyleSheet} selectedImage={selectedImage}/>
                            </PDFViewer>
                        </div>
                        <div className="row border-left">
                            <div className="col-12">
                                <TooltipElement keyName='topConfigPDF' placement='top' text='Configurações do PDF'
                                    component={(
                                        <Button
                                            variant='info'
                                            className="ml-1 mb-1"
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
                                        <ConfigPreferencesPDF pdfStyleSheet={pdfStyleSheet} setPdfStyleSheet={setPdfStyleSheet}  setSelectedImage={setSelectedImage}/>
                                        <hr />
                                    </div>
                                </Collapse>

                                <DragAndDrop textsSource={musics} changeOrderList={changeOrderList} />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <PDFDownloadLink key="modalPDFLink" className="ml-2" document={<MyDocument musics={musics} configPreferencesDefault={pdfStyleSheet} selectedImage={selectedImage}/>} fileName="Documento.pdf">
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