import express from "express";
import verifySignature from "./src/verifySignature.js";
import verifyTimestamp from "./src/verifyTimestamp.js";
import parseSignatureHeader from "./src/parseSignatureHeader.js";

const PORT = 4500;
const WEBHOOK_URL = `https://your.domain.here/webhook`;
const WEBHOOK_SECRET = "VERY_SECRET_SECRET";

const app = express();
app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (req, res, next) => {
    const { timestamp, signature } = parseSignatureHeader(
      req.header('truepic-signature')
    )

    const isTimestampVerified = verifyTimestamp({ timestamp })

    if (!isTimestampVerified) {
      console.warn('Invalid timestamp')
      return res.sendStatus(200)
    }

    const isSignatureVerified = verifySignature({
      url: WEBHOOK_URL,
      timestamp,
      body: req.body.toString(),
      secret: WEBHOOK_SECRET,
      signature,
    })

    if (!isSignatureVerified) {
      console.warn('Invalid signature')
      return res.sendStatus(200)
    }

    next()
  },
  (req, res) => {
    const body = JSON.parse(req.body.toString())

    console.log(`Processing webhook: ${body.action}`)
    console.dir(body, { depth: null })

    res.sendStatus(200)
  }
);

app.listen(PORT, () => {
  console.log(`Server listening for webhooks at ${WEBHOOK_URL}`);
})
