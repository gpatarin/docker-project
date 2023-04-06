import express from 'express';

import * as dotenv from 'dotenv'
dotenv.config()

const PORT = process.env['PORT'];

if (!PORT) throw Error('PORT not existing. You forgot to set it as env variable.')

const server = express();

server.get('/', (req, res) => {
  res.status(201).send('OK i');
});

server.listen(PORT, () => {
  console.log(`Listening on :${PORT}`)
})
