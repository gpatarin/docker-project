import { CommandInteraction, Client } from "discord.js";
import { Command } from "./command";
import { Poll } from "./poll";
import { Hello } from "./hello";

export const Commands: Command[] = [Poll, Hello];