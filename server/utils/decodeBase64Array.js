const fs = require('fs')
const Readable = require('stream').Readable
const generateID = './generateID'

module.exports = function decodeBase64Array(arrayBuffer) {
  const pdfBuffer = Buffer.from(arrayBuffer, 'base64')
  const pdf = new Readable()

  pdf.push(pdfBuffer)
  pdf.push(null)
  pdf.pipe(fs.createWriteStream(`${generateID()}.pdf`))
  
  return pdf
}
