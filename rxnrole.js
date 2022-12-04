module.exports = {
    name: 'rxnrole',
    description: "Sets up a reaction role message!",
    async execute(message, args, Discord, client) {
        const channel = '872591066568740895';

        const yellowTeamRole = message.guild.roles.cache.find(role => role.name === "role1");
        const blueTeamRole = message.guild.roles.cache.find(role => role.name === "role2");

        const yellowTeamEmoji = '🙃';
        const blueTeamEmoji = '😀';

        let embed = new Discord.MessageEmbed()
            .setColor('#e42643')
            .setTitle('Choose a team to play on!')
            .setDescription('Choosing a team will allow you to interact with your teammates!\n\n' +
                `${yellowTeamEmoji} for role1 \n` +
                `${blueTeamEmoji} for role2 `);

        let messageEmbed = await message.channel.send(embed);
        messageEmbed.react('🙃');
        messageEmbed.react('😀');

        client.on('messageReactionAdd', async(reaction, user) => {
            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;

            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === yellowTeamEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add("872590642398777394");
                }
                if (reaction.emoji.name === blueTeamEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.add("872590709448921148");
                }
            }

        });

        client.on('messageReactionRemove', async(reaction, user) => {

            if (reaction.message.partial) await reaction.message.fetch();
            if (reaction.partial) await reaction.fetch();
            if (user.bot) return;
            if (!reaction.message.guild) return;


            if (reaction.message.channel.id == channel) {
                if (reaction.emoji.name === yellowTeamEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove("872590642398777394");
                }
                if (reaction.emoji.name === blueTeamEmoji) {
                    await reaction.message.guild.members.cache.get(user.id).roles.remove("872590709448921148");
                }
            }
        });
    }

}