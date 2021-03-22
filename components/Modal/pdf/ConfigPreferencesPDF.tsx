import { useSession } from "next-auth/client";
import { useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { toast } from 'react-toastify';
import SpinnerLoading from "../../SpinnerLoading";

const colorsEnum = require("../../../util/colors");
const tamanhoFolhasEnum = require("../../../util/tamanho-folhas");

export class PdfStyleSheet {
    constructor(
        public id: number,
        public size: string,
        public fontColor: string,
        public fontSize: number,
        public fontFamily: string,
        public backgroundColor: string,
        public delimiter: string,
        public imageWidth: string,
        public imageHeight: string) { }
}

const ConfigPreferencesPDF: React.FC<{ pdfStyleSheet?: PdfStyleSheet, setPdfStyleSheet?, setSelectedImage?}> = ({ pdfStyleSheet, setPdfStyleSheet, setSelectedImage }) => {
    const [session, loading] = useSession()
    const [spinner, showSpinner] = useState(false)

    const saveConfigPreferences = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        try {
            showSpinner(true)
            const body = { ...pdfStyleSheet, organizationId: (session?.user as any)?.organizationId }
            await fetch('/api/configuration-preferences-pdf', {
                method: pdfStyleSheet.id ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            }).then(() => {
                showSpinner(false)
                toast.success("Salvo com sucesso")
            })
        } catch (error) {
            console.error(error)
        }
    }

    const changeImage = (event) => {
        if (event.target?.files[0]) {
            var reader = new FileReader();
            reader.onload = e => setSelectedImage(e.target.result)

            reader.readAsDataURL(event.target.files[0]);
        } else {
            setSelectedImage(null)
        }
    };

    return (<>
        {loading || spinner ? (<SpinnerLoading />) :
            (<>
                <Form onSubmit={saveConfigPreferences}>
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
                    </Form.Row>

                    <Form.Row>
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

                        <Form.Group as={Col} controlId="formFolha">
                            <Form.Label>Tamanho folha</Form.Label>
                            <Form.Control as="select" custom value={pdfStyleSheet.size}
                                onChange={(e) =>
                                    setPdfStyleSheet({ ...pdfStyleSheet, size: e.target.value })
                                }>
                                {tamanhoFolhasEnum.values().map((folha, index) => (
                                    <option key={`listTamanhoFolha${index}`} value={folha}>{folha}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>

                    <div className="row">
                        <div className="col">
                            <Button variant="success float-right" type="submit">
                                Salvar preferências
                                </Button>
                        </div>
                    </div>
                </Form>

                <hr />

                <div>
                    <h4 className="text-center mb-4">Imagem de Capa</h4>

                    <Form.Group controlId="formInputImage">
                        <input type="file" name="file" onChange={changeImage}
                            accept="image/x-png,image/gif,image/jpeg" />
                    </Form.Group>

                    <Form.Group controlId="formHeight">
                        <Form.Label>Altura Imagem</Form.Label>
                        <Form.Control type="range" custom onChange={(e) => 
                            setPdfStyleSheet({ ...pdfStyleSheet, imageHeight: e.target.value })
                        } />
                    </Form.Group>

                    <Form.Group controlId="formWidth">
                        <Form.Label>Largura Imagem</Form.Label>
                        <Form.Control type="range" custom onChange={(e) => 
                            setPdfStyleSheet({ ...pdfStyleSheet, imageWidth: e.target.value })
                        } />
                    </Form.Group>
                </div>
            </>)}
    </>);
}

export default ConfigPreferencesPDF;