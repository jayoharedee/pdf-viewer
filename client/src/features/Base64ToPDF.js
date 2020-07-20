import React from 'react'
import PDFViewer from 'pdf-viewer-reactjs'

const Base64ToPDF = ({base64}) => (
  <div className='col-sm-12 text-center'>
      <h1 className='text-white bg-info rounded'>
          Load PDF from base 64 string
      </h1>
      <div className='border rounded'>
          <PDFViewer
              document={{
                  base64,
              }}
          />
      </div>
  </div>
)

export default Base64ToPDF