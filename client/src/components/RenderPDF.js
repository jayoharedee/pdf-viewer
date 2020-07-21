import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';

import samplePDF from './sample.pdf';

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