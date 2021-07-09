const Timeline: React.FC = () => {
    return (<>
        <div>
            <div className="row">
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title mb-4">Passo a passo</h4>
                            <div className="hori-timeline" dir="ltr">
                                <ul className="list-inline events">
                                    <li className="list-inline-item event-list">
                                        <div className="px-4">
                                            <div className="event-date bg-soft-primary text-primary">1° Passo</div>
                                            <h5 className="font-size-16">Começou</h5>
                                            <p className="text-muted text-paragraph">Acesse a aba Músicas no menu, lá você poderá visualizar uma lista com todas as músicas já cadastradas, mas se não tiver nenhuma é só cadastrar.</p>
                                        </div>
                                    </li>
                                    <li className="list-inline-item event-list">
                                        <div className="px-4">
                                            <div className="event-date bg-soft-success text-success">2° Passo</div>
                                            <h5 className="font-size-16">Músicas cadastradas</h5>
                                            <p className="text-muted text-paragraph">Com as músicas já cadastradas você terá a opção de selecioná-las e no menu superior visualizar o slide. Ou se preferir faça Download sem visualizar.</p>
                                        </div>
                                    </li>
                                    <li className="list-inline-item event-list">
                                        <div className="px-4">
                                            <div className="event-date bg-soft-danger text-danger">3° Passo</div>
                                            <h5 className="font-size-16">Configure</h5>
                                            <p className="text-muted text-paragraph">Na janela que exibiu você pode modificar cor de fundo, letra, etc. Temos algumas opções para que você personalize seu slide. Não esqueça de salvar suas preferências.</p>
                                        </div>
                                    </li>
                                    <li className="list-inline-item event-list">
                                        <div className="px-4">
                                            <div className="event-date bg-soft-warning text-warning">4° Passo</div>
                                            <h5 className="font-size-16">Desfrute</h5>
                                            <p className="text-muted text-paragraph">Faça download no formato PDF e aproveite. Dica: faça upload de uma imagem da sua congregação e informe nas configurações se ela deve aparecer no slide.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Timeline