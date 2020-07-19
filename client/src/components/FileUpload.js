import React, { Fragment, useState } from 'react'
import axios from 'axios'

import Message from './Message'
import Progress from './Progress'
import Viewer from './Viewer'

const FileUpload = () => {
  const [pdf, setPdf] = useState('')
  const [pdfName, setPdfName] = useState('Choose PDF')
  const [uploadedPdf, setUploadedPdf] = useState({})
  const [message, setMessage] = useState('')
  const [uploadPercentage, setUploadPercentage] = useState(0)

  const onChange = (event) => {
    console.log(event.target)
    setPdf(event.target.files[0])
    setPdfName(event.target.files[0].name)
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    console.log(event.target, 'response')
    const formData = new FormData()
    formData.append('pdf', pdf)

    try {
      const response = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(
            parseInt(
              Math.round(progressEvent.loaded * 100) /
                progressEvent.total
            )
          )

          // clear percentage
          setTimeout(() => setUploadPercentage(0), 10000)
        },
      })

      const { pdfName, pdfPath } = response.data
      setUploadedPdf({ pdfName, pdfPath })
      setMessage('File Uploaded')
    } catch (error) {
      console.log(error)
      // check for server errors
      if (error) {
        setMessage('There was a problem with the server')
        return
      }

      setMessage(error.response.data.msg)
    }
  }

  return (
    <Fragment>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
        <div className="custom-file mb-4">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={onChange}
          />
          <label
            className="custom-file-label"
            htmlFor="customFile"
          >
            {pdfName}
          </label>
        </div>

        <Progress percentage={uploadPercentage} />

        <input
          type="submit"
          value="Upload"
          className="btn btn-primary btn-block mt-4"
        />
      </form>
      {uploadedPdf ? (
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <h3 className="text-center">
              {uploadedPdf.pdfName}
            </h3>

            <Viewer pdfPath={uploadedPdf.pdfPath} />

            {/* <img
              style={{ width: '100%' }}
              src={uploadedPdf.pdfPath}
              alt=""
            /> */
            console.log(uploadedPdf.pdfName)
            }
          </div>
        </div>
      ) : null}
    </Fragment>
  )
}

export default FileUpload
