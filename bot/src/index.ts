import express from 'express';
import { CommandInteraction, ChatInputApplicationCommandData, Client, ClientOptions } from "discord.js";
import interactionCreate from "./listeners/interactionCreate";
import ready from "./listeners/ready";

import * as dotenv from 'dotenv'
dotenv.config()

const API_KEY = process.env['DISCORD_TOKEN'];
const PORT = process.env['PORT'];

if (!API_KEY) throw Error('DISCORD_TOKEN not existing. You forgot to set it as env variable.')
if (!PORT) throw Error('PORT not existing. You forgot to set it as env variable.')

const server = express();

server.get('/', (req, res) => {
res.status(201).send('OK');
});

server.listen(PORT, () => {
console.log(`Listening on :${PORT}`)
})

const client = new Client({
intents: []
});

ready(client);
interactionCreate(client);

client.login(API_KEY);

console.log(client);


