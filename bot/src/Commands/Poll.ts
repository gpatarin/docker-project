import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../interfaces/Command";
import { AttachmentBuilder, EmbedBuilder, MessageReaction } from "discord.js";
import { Poll as IPoll } from 'api/src/model/Poll';
import axios from "axios";

const MinutesToMilliseconds = (minutes: number) => {
    return minutes * 60000;
}

export const poll: Command = {
  data: new SlashCommandBuilder()
    .setName("sondage")
    .setDescription("On crée des sondages !")
    .addStringOption((option) =>
      option
        .setName("question")
        .setDescription("La question du sondage")
        .setRequired(true)
    )
    .addStringOption((option) =>
        option
            .setName("timer")
            .setDescription("Temps en minutes du sondage")
            .setRequired(false)
    ),
  run: async (interaction) => {
    let question = interaction.options.get("question")?.value ?? "Question non remplie";
    let timer = interaction.options.get("timer")?.value ?? 10;
    timer = MinutesToMilliseconds(timer as number);
    
    const attachment = new AttachmentBuilder('assets').setName('gon.jpg').setFile("assets/gon.jpg")

    const filter = (reaction : MessageReaction) => {
        return (reaction.emoji.name === '👍'  || reaction.emoji.name === '👎');
    };

    const embed = new EmbedBuilder()
        .setTitle(question.toString())
        .setImage(`attachment://${attachment.name}`)
        .setTimestamp((timer as number)  -1000)
        .setDescription(`Temps restant: ${Math.ceil(timer / 1000)} secondes`);

        
    const message = await interaction.reply({
        embeds: [embed],
        files: [attachment],
        fetchReply: true
    });

    await message.react('👍');
    await message.react('👎');
    


    const intervalId = setInterval(() => {
        timer = (timer as number)  -1000;
        embed.setTimestamp(Date.now());
        embed.setDescription(`Temps restant: ${Math.ceil(timer / 1000)} secondes`);
        message.edit({
            embeds: [embed]
        });
    }, 1000);

    

    const collector = message.createReactionCollector({ filter, time: timer, dispose: true});
       
    collector.on('collect', (reaction, user) => {
       if(user.bot) return;
        console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
        
        const message = reaction.message;
        
        // Check if the user has already reacted to another emoji
        const previousReaction = message.reactions.cache.find(r => r.users.cache.has(user.id) && r.emoji.name !== reaction.emoji.name);
        
        if (previousReaction) {
          previousReaction.users.remove(user.id)
            .then(() => {
              console.log(`Removed previous reaction ${previousReaction.emoji.name} from ${user.tag}`);
            })
            .catch(console.error);
        }
      });

    collector.on('remove', (reaction, user) => {
        console.log(`Removed ${reaction.emoji.name} from ${user.tag}`);
    });
    
    collector.on('end', collected => {
        
        console.log("End of collection")

        clearInterval(intervalId);

       console.log(`Collected ${collected.size} items`);

        message.delete();
    });
    
  }
};
