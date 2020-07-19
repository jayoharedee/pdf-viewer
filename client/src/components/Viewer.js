import React from 'react'
import PDFViewer from 'pdf-viewer-reactjs'

const Viewer = ({pdfPath}) => {
  return pdfPath ? (
    <PDFViewer
      document={{
        url: `http://localhost:5000/upload/${pdfPath}`,
      }}
    />
  ) : null
}

export default Viewer
