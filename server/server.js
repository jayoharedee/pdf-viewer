const base64Encoder = require('./utils/getBase64String')
const express = require('express')
const fileupload = require('express-fileupload')

const app = express()

// middlewares
app.use(fileupload())

// upload endpoint
app.post('/upload', (req, res) => {
  // reject bad requests
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' })
  }

  const pdf = req.files.pdf

  pdf.mv(
    `${__dirname}/../client/public/uploads/${pdf.name}`,
    (err) => {
      // reject server errors
      if (err) {
        console.log(err)
        return res.status(500).send(err)
      }

      // const base64PDFData = base64Encoder(pdf.data)

      console.log(pdf.pdfPath)
      res.json({
        pdfName: pdf.name,
        pdfPath: `/uploads/${pdf.pdfPath}`,
      })
    }
  )
})

// server
app.listen(5000, () => console.log('server started...'))
