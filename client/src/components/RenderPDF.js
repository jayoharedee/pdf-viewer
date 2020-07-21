
import samplePDF from './sample.pdf';

import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.1.266/pdf.worker.js`;

export default function RenderPDF() {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <Document
      file={samplePDF}
      onLoadSuccess={onDocumentLoadSuccess}
    >
      {Array.from(
        new Array(numPages),
        (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
          />
        ),
      )}
    </Document>
  );
}