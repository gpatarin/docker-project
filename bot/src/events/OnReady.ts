import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { Client } from "discord.js";
import { CommandList } from "../interfaces/CommandsList";

export const onReady = async (BOT: Client) => {
  const rest = new REST({ version: "9" }).setToken(
    process.env['DISCORD_TOKEN'] as string
  );

  const commandData = CommandList.map((command) => command.data.toJSON());

  await rest.put(
    Routes.applicationCommands(BOT.user?.id || "missing id"),
    { body: commandData }
  );
  

  console.log("Discord ready!");
};
