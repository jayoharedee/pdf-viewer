export default function decodeBase64Array(arrayBuffer) {
  return btoa(
    new Uint8Array(arrayBuffer)
      .reduce(
        (data, byte) => (
          data.push(String.fromCharCode(byte)), data
        ),
        []
      )
      .join('')
  )
}
