# Truepic Webhook Signature Tester

This is an example project showing how to verify Truepic webhook signatures in Node.js.

For the full documentation on Truepic's webhook signature verification, please see the [Webhook Signature Verification](https://vision.truepic.dev/docs/webhook-setup) documentation.

## Installation

```bash
npm install
```

## Configuration

In the `index.js` file you will need to set the `PORT`, `WEBHOOK_URL`, and `WEBHOOK_SECRET` variables.

- `PORT` - The port that the server will listen on.
- `WEBHOOK_URL` - The URL that Truepic will send webhooks to.  This should be the URL of the server that is running this code.  If you are running this locally, you can use a service like [ngrok](https://ngrok.com/) to create a public URL that will forward to your local server.
- `WEBHOOK_SECRET` - The secret that Truepic will use to sign the webhook payloads

## Usage

```bash
npm start
```

