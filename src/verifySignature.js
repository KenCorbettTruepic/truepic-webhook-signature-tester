/* Dependencies */
import { createHmac, timingSafeEqual } from "crypto";

/* Services */
export default function verifySignature({ url, timestamp, body, secret, signature }) {
  const comparisonSignature = createHmac("sha256", secret);

  comparisonSignature.update([url, timestamp, body].join(","));

  return timingSafeEqual(
    Buffer.from(comparisonSignature.digest("base64"), "base64"),
    Buffer.from(signature, "base64"),
  );
}
