import express from 'express';
import * as dotenv from 'dotenv'
import { Client, IntentsBitField } from 'discord.js';
import { onInteraction } from './events/OnInteraction';
import { onReady } from './events/OnReady';
dotenv.config()

const API_KEY = process.env['DISCORD_TOKEN'];
const PORT = process.env['PORT'];
const GUILD_ID = process.env['GUILD_ID'];

if (!API_KEY) throw Error('DISCORD_TOKEN not existing. You forgot to set it as env variable.')
if (!PORT) throw Error('PORT not existing. You forgot to set it as env variable.')
if (!GUILD_ID) throw Error('GUILD_ID not existing. You forgot to set it as env variable.')

const server = express();

server.get('/', (req, res) => {
res.status(201).send('OK');
});

server.listen(PORT, () => {
console.log(`Listening on :${PORT}`)
})

server.get('/healthcheck', (req, res) => {
    if (BOT.readyAt) {
      res.status(200).send('Bot is ready');
    } else {
      res.status(500).send('Bot is not ready');
    }
  });
  



const BOT = new Client({
    intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.GuildMessageReactions]
    });
    
BOT.on("ready", async () => await onReady(BOT));

BOT.on(
    "interactionCreate",
    async (interaction) => await onInteraction(interaction)
);

BOT.login(process.env.BOT_TOKEN);