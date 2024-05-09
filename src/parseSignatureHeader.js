export default function parseSignatureHeader(header) {
    const error = new Error('Invalid truepic-signature header')
  
    if (!header?.length) {
      throw error
    }
  
    const [timestampParts, signatureParts] = header.split(',')
  
    if (!timestampParts?.length || !signatureParts?.length) {
      throw error
    }
  
    let [t, timestamp] = timestampParts.split('=')
  
    if (t !== 't' || !timestamp?.length) {
      throw error
    }
  
    timestamp = Number(timestamp)
  
    if (isNaN(timestamp)) {
      throw error
    }
  
    const [s, signature] = signatureParts.split('=')
  
    if (s !== 's' || !signature?.length) {
      throw error
    }
  
    return { timestamp, signature }
  }