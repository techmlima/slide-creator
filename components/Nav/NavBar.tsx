import { PDFDownloadLink } from "@react-pdf/renderer";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Download, Eye, PlusCircle, Trash } from "react-bootstrap-icons";
import MyDocument from "../Modal/pdf/PdfDocument";
import TooltipElement from "../TooltipElement";
import BasicConfirmModalCenter from "../Modal/BasicConfirmModalCenter";
import ModalPDFView, { defaultPreferences } from "../Modal/pdf/ModalPDFView";
import { MusicTableProps } from "../MusicTable";

const NavBar: React.FC<{ musicsSelect: MusicTableProps[], configPreferences, changeOrderList, showSpinner }> = ({ musicsSelect, configPreferences, changeOrderList, showSpinner }) => {
    const router = useRouter()
    const [modalShow, setModalShow] = useState(false);
    const [modalExcludeShow, setModalExcludeShow] = useState(false);

    const deleteMusics = () => {
        showSpinner(true)
        setModalExcludeShow(false)

        Promise.all(
            musicsSelect.map(t => (deleteMusic(t.id)))
        ).finally(() => {
            showSpinner(false)
            //TODO: RECARREGAR SOMENTE O QUE MUDOU
            location.reload()
        })
    }

    async function deleteMusic(id: number): Promise<any> {
        return await fetch(`/api/music/${id}`, { method: 'DELETE' })
    }

    return (
        <div key="nav-itens" className="row">
            <TooltipElement keyName='top1' placement='top' text='Download PDF'
                component={(
                    <div className='nav-button'>
                        {musicsSelect.length > 0 ? (
                            <PDFDownloadLink document={
                                <MyDocument musics={musicsSelect} configPreferencesDefault={configPreferences ? configPreferences : defaultPreferences} />
                            } fileName="Documento.pdf">
                                {({ blob, url, loading, error }) => (loading ? '...' :
                                    <div className='btn btn-info' >
                                        <Download />
                                    </div>
                                )}
                            </PDFDownloadLink>
                        ) : null}
                    </div>
                )}>
            </TooltipElement>

            <TooltipElement keyName='top2' placement='top' text='Deletar um ou mais textos'
                component={(
                    <div className='nav-button'>
                        <Button onClick={() => setModalExcludeShow(true)} variant="danger" disabled={musicsSelect.length === 0}
                            className='nav-button'>
                            <Trash />
                        </Button>

                        <BasicConfirmModalCenter titleText="Cuidado!" show={modalExcludeShow} onHide={() => setModalExcludeShow(false)}
                            message="Deseja realmente excluir a(s) música(s) selecinada(s)?" confirmAction={deleteMusics} />
                    </div>
                )}>
            </TooltipElement>

            <TooltipElement keyName='top3' placement='top' text='Visualizar PDF'
                component={(
                    <div className='nav-button'>
                        <Button className='nav-button' disabled={musicsSelect.length === 0} variant="primary" onClick={() => setModalShow(true)}>
                            <Eye />
                        </Button>

                        <ModalPDFView musics={musicsSelect} changeOrderList={changeOrderList} configPreferencesDefault={configPreferences}
                            show={modalShow} onHide={() => setModalShow(false)} />
                    </div>
                )}>
            </TooltipElement>

            <TooltipElement keyName='top4' placement='top' text='Criar Novo'
                component={(
                    <div className='nav-button mr-3'>
                        <Button onClick={() => router.push("/music/create")} variant="success">
                            <PlusCircle />
                        </Button>
                    </div>
                )}>
            </TooltipElement>
            <style jsx>{`
                .nav-button {
                  padding-left: 0.2rem;
                }
            `}</style>
        </div>
    );
}

export default NavBar;

