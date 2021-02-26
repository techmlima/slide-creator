
import Link from "next/link";
import React from "react";
import { Table } from "react-bootstrap";

export type TextSourceProps = {
  id: number;
  title: string;
  text: string;
  isCreatePDF: boolean;
};

const TextSource: React.FC<{ textsSource: TextSourceProps[], onChange }> = ({ textsSource, onChange }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Título</th>
          <th>Trecho</th>
          <th>Selecionar</th>
        </tr>
      </thead>
      <tbody>
        {textsSource.map((textSource) => (
          <tr key={textSource.id}>
            <td className="max-width">
              <Link href={`/text-source/${textSource.id}`}>
                <a>{textSource.title}</a>
              </Link>
            </td>
            <td className="limit-text">{textSource.text}</td>
            <td className="max-width">
              <input type='checkbox'
                name={`checkText${textSource.id}`}
                checked={textSource.isCreatePDF || false}
                onChange={e => onChange(e, textSource.id)}>
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
  );
};

export default TextSource;
