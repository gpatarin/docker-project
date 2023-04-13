import { CommandInteraction, Client, ApplicationCommandType } from "discord.js";
import { Command } from "./command";

export const Poll: Command = {
    name: "poll",
    description: "Returns a greeting",
    type: ApplicationCommandType.ChatInput,
    run: async (client: Client, interaction: CommandInteraction) => {
        const content = "poll";
        // ICI TU AS RECU LA COMMANDE
        await interaction.followUp({
            ephemeral: true,
            content
        });
    }
};