const express = require('express')
const cors = require('cors')
const fileupload = require('express-fileupload')

const newID = require('./utils/generateID')
const decodeBase64Array = require('./utils/decodeBase64Array')

const app = express()

// middlewares
app.use(fileupload())

// upload endpoint
app.post('/upload', cors(), (req, res) => {
  // reject bad requests
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' })
  }

  const pdf = req.files.pdf
  const pdfName = `${newID()}${pdf.name}`
  const base64ToPDF = decodeBase64Array(pdf.data)

  console.log(pdf)
  pdf.mv(
    `${__dirname}/../client/public/uploads/${pdfName}`,
    (err) => {
      // reject server errors
      if (err) {
        console.log(err)
        return res.status(500).send(err)
      }

      res.json({
        pdfName: pdf.name,
        pdfPath: `uploads/${pdfName}`,
        pdfData: base64ToPDF,
      })
    }
  )
})

// server
app.listen(5000, () => console.log('server started...'))
