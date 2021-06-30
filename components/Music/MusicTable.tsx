
import Link from "next/link";
import React from "react";
import { Table } from "react-bootstrap";
import TooltipElement from "../TooltipElement";

export type MusicTableProps = {
  id: number;
  title: string;
  text: string;
  isCreatePDF: boolean;
};

const MusicTable: React.FC<{ musics: MusicTableProps[], onChange }> = ({ musics, onChange }) => {
  //TODO: CRIAR ORDENADOR
  return (
    <>
      {!musics || musics?.length == 0 ? (
        <h5 className="w-100 mt-5 text-center">
          Nenhuma música cadastrada para a sua Organização
        </h5>
      ) : (<Table striped bordered hover>
        <thead>
          <tr>
            <th>Título</th>
            <th>Trecho</th>
            <th>Selecionar</th>
          </tr>
        </thead>
        <tbody>
          {musics.map((music) => (
            <tr key={music.id}>
              <td className="max-width">
                <TooltipElement keyName='titleTop' placement='top' text='Alterar'
                  component={(
                    <div style={{display: 'inline'}}>
                      <Link href={`/music/${music.id}`}>
                        <a>{music.title}</a>
                      </Link>
                    </div>
                  )}>
                </TooltipElement>
              </td>
              <td className="limit-text">{music.text}</td>
              <td className="max-width">
                <input type='checkbox'
                  name={`checkText${music.id}`}
                  checked={music.isCreatePDF || false}
                  onChange={e => onChange(e, music.id)}>
                </input>
              </td>
            </tr>
          ))}
        </tbody>
        <style jsx>{`
            .limit-text {
              max-width: 30vw;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            th, td{
              text-align: center!important;
            }

            max-width {
              max-width: 5rem;
            }
         `}</style>
      </Table>
      )}
    </>
  );
};

export default MusicTable;
