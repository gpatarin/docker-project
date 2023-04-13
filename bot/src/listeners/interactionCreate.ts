import { CommandInteraction, ButtonInteraction, Client, Interaction } from "discord.js";
import { Commands } from "../commands";


export interface Poll {
    id: string;
    agree: number;
    disagree: number;
    result: string;
}

export default (client: Client): void => {
    client.on("interactionCreate", async (interaction: Interaction) => {
        if (interaction.isCommand() || interaction.isChatInputCommand()) {
            await handleSlashCommand(client, interaction, title);
        } else if (interaction.isCommand()) {
            
        }
    });
};

const handleSlashCommand = async (client: Client, interaction: CommandInteraction, title: String): Promise<void> => {
    // handle slash command here

    const slashCommand = Commands.find(c => c.name === interaction.commandName);
    if (!slashCommand) {
        interaction.followUp({ content: "An error has occurred" });
        return;
    }

    await interaction.deferReply();

    slashCommand.run(client, interaction, title);

};
