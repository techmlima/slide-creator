import { PDFDownloadLink } from "@react-pdf/renderer";
import Router from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import MyDocument from "../lib/pdf/pdf-document";

var pdfUtil = require('../util/pdf-util');

export type TextSourceProps = {
    id: number;
    title: string;
    text: string;
    isCreatePDF: boolean;
};

const TextSource: React.FC<{ textSource: TextSourceProps, onChange }> = ({ textSource, onChange }) => {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])
  
    return (
        <div onDoubleClick={() => Router.push("/text-source/[id]", `/text-source/${textSource.id}`)}>
            <h2>{textSource.title}</h2>
            Participa PDF:
            <input type='checkbox' 
              name="Participa PDF"
              checked={textSource.isCreatePDF}
              onChange={e => onChange(e, textSource.id)}>                         
            </input>
            
            <style jsx>
              {
                `div {
                  color: inherit;
                  padding: 1rem;
                  cursor: pointer;
                }`
              }
        </style>
        </div>
    );
};

export default TextSource;
