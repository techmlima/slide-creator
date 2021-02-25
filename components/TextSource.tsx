
import Link from "next/link";
import Router from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";

export type TextSourceProps = {
  id: number;
  title: string;
  text: string;
  isCreatePDF: boolean;
};

const TextSource: React.FC<{ textsSource: TextSourceProps[], onChange }> = ({ textsSource, onChange }) => {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

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
            <td>
              <Link href={`/text-source/${textSource.id}`}>
                <a>{textSource.title}</a>
              </Link>
            </td>
            <td className="limit-text">{textSource.text}</td>
            <td>
              <input type='checkbox'
                name={`Selecionar${textSource.id}`}
                checked={textSource.isCreatePDF}
                onChange={e => onChange(e, textSource.id)}>
              </input>
            </td>
          </tr>
        ))}
        <style jsx>{`
            .limit-text {
              max-width: 300px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }

            table > th, td{
              text-align: center!important;
            }
         `}</style>
      </tbody>
    </Table>
  );
};

export default TextSource;
