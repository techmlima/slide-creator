import { PDFDownloadLink } from "@react-pdf/renderer";
import { useRouter  } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Download, Eye, PlusCircle, Trash } from "react-bootstrap-icons";
import MyDocument from "../../lib/pdf/pdf-document";
import ModalPDFView from "../Modal/ModalPDFView";
import { TextSourceProps } from "../TextSource";
import NavButton from "./NavButton";

const NavBar: React.FC<{ textsSelected: TextSourceProps[], changeOrderList }> = ({ textsSelected, changeOrderList }) => {
    const router = useRouter()
    const [modalShow, setModalShow] = useState(false);


    const deleteTextSource = async () => {
        await textsSelected.forEach(t => deleteMusic(t.id));
        setTimeout(() => router.reload())       
    }

    //TODO: melhorar método
    async function deleteMusic(id: number): Promise<void> {
        await fetch(`/api/text-source/${id}`, { method: 'DELETE' })       
    }

    return (
        <div key="nav-itens" className="row float-right">
            <NavButton keyName='top1' placement='top' text='Download PDF'
                component={(
                    <div className='nav-button'>
                        {textsSelected.length > 0 ? (
                            <PDFDownloadLink document={<MyDocument textSource={textsSelected} />} fileName="Documento.pdf">
                                {({ blob, url, loading, error }) => (loading ? '...' :
                                    <div className='btn btn-info' >
                                        <Download />
                                    </div>
                                )}
                            </PDFDownloadLink>
                        ) : null}
                    </div>
                )}>
            </NavButton>

            <NavButton keyName='top2' placement='top' text='Deletar um ou mais textos'
                component={(
                    <div className='nav-button'>
                        <Button onClick={deleteTextSource} variant="danger" disabled={textsSelected.length === 0}
                            className='nav-button'>
                            <Trash />
                        </Button>
                    </div>
                )}>
            </NavButton>

            <NavButton keyName='top3' placement='top' text='Visualizar PDF'
                component={(
                    <div className='nav-button'>
                        <Button className='nav-button' disabled={textsSelected.length === 0} variant="primary" onClick={() => setModalShow(true)}>
                            <Eye />
                        </Button>

                        <ModalPDFView textsSelected={textsSelected} changeOrderList={changeOrderList}
                            show={modalShow} onHide={() => setModalShow(false)} />
                    </div>
                )}>
            </NavButton>

            <NavButton keyName='top4' placement='top' text='Criar Novo'
                component={(
                    <div className='nav-button mr-3'>
                        <Button onClick={() => router.push("/text-source/create")} variant="success">
                            <PlusCircle />
                        </Button>
                    </div>
                )}>
            </NavButton>

            <style jsx>{`
                .nav-button {
                  padding-right: 0.2rem;
                  padding-left: 0.2rem;
                }
            `}</style>
        </div>
    );
}

export default NavBar;

