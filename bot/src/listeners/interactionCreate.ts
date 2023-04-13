import { CommandInteraction, Client, Interaction } from "discord.js";
import { Commands } from "../commands";
import express, { Express } from "express";

const server = express();

server.use(express.json());

export interface Poll {
    id: string;
    agree: number;
    disagree: number;
    result: string;
}

export default (client: Client): void => {
    client.on("interactionCreate", async (interaction: Interaction) => {
        if (interaction.isCommand()) {
            await handleSlashCommand(client, interaction);
        }
    });
};

const handleSlashCommand = async (client: Client, interaction: CommandInteraction): Promise<void> => {
    // handle slash command here

    const slashCommand = Commands.find(c => c.name === interaction.commandName);
    if (!slashCommand) {
        interaction.followUp({ content: "An error has occurred" });
        return;
    }

    await interaction.deferReply();

    slashCommand.run(client, interaction);

    server.post('/api/insert', async (req, res) => {
        const poll: Poll = req.body as Poll; 
        try {
        // const newPoll = new PollModel(poll);
        // await newPoll.save();
        res.status(201).send('Poll inserted successfully');
        } catch (err) {
        console.log(`Error inserting poll: ${err}`);
        res.status(500).send('Internal server error');
        }
    });
    
    const apiUrl = 'http://localhost:3000/api/insert'; 

}; 

