import { CommandInteraction, Client, ApplicationCommandType } from "discord.js";
import { Command } from "./command";
import { Poll as IPoll } from 'api/src/model/Poll';
import axios from "axios";

export const Poll: Command = {
    name: "poll",
    description: "Returns a greeting",
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        const content = "DO YOU WANT TO FUCK ME ?";
        
        await interaction.followUp({
            ephemeral: true,
            content
        }).then((message) => {
            
            const data: IPoll = { id: message.id, agree: 0, disagree: 0, result: content };
            if (message) {
                axios.post("http://localhost:4000/api/insert", data).catch((e) => {
                    console.error(e, 'WTF');
                    console.log(message.deletable);
                    message.delete().catch((e) => console.error(e, 'WTF'));
                });
            }
        });
    }
};