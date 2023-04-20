import { CommandInteraction, Client, ApplicationCommandType, AttachmentBuilder, EmbedBuilder, ReactionCollector ,MessageReaction} from "discord.js";
import { Command } from "./command";
import { Poll as IPoll } from 'api/src/model/Poll';
import axios from "axios";
const ms = require("ms");

export const Poll: Command = {
    name: "poll",
    description: "Returns a greeting",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "question",
            description: "The question to ask in the poll",
            type: 3,
            required: true
        },
        {
            name: "timer",
            description: "Timeout duration",
            type: 4,
            maxValue : 8.64e7,
            min_value : 5000,
            required: false
        }
    ],
    run: async (client: Client, interaction: CommandInteraction) => {

        let question = interaction.options.get("question")?.value ?? "Question non remplie";
        const duration = interaction.options.get("timer")?.value ?? "Pas de delai";
        const attachment = new AttachmentBuilder('assets').setName('gon.jpg').setFile("assets/gon.jpg")
        const msDuration = ms(duration);

        const filter = (reaction : MessageReaction) => {
            return (reaction.emoji.name === '👍'  || reaction.emoji.name === '👎');
        };

        const embed = new EmbedBuilder()
            .setTitle(question.toString())
            .setImage(`attachment://${attachment.name}`)

        await interaction.followUp({
            ephemeral: true,
            embeds: [embed],
            files: [attachment]
        }).then((message) => {
            
            const data: IPoll = { id: message.id, question: question.toString(), agree: 0, disagree: 0, result: "Inachevé" };
            if (message) {
                axios.post("http://localhost:4000/api/insert", data).catch((e) => {
                    if (message.channel && message.deletable) {
                        message.channel.fetch().then((channel) => {
                            message.delete().catch((e) => console.error(e, 'WTF'));
                        });
                      }
                });
                message.channel.fetch().then((channel) => {
                    message.react('👍');
                    message.react('👎');
                });
                
                const collector = message.createReactionCollector({ filter, time: msDuration});
                
                collector.on('collect', (reaction, user) => {
                    console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
                });
                collector.on('end', collected => {
                    console.log(`Collected ${collected.size} items`);
                });
                
            }
        });
    }
};


