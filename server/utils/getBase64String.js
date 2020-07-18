module.exports = function getBase64String(path) {
  const pdfBase64Encoded = Buffer.from(path, 'utf8').toString('base64')
  console.log(pdfBase64Encoded)
  return pdfBase64Encoded
}
