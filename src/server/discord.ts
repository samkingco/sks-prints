import discord, { EmbedBuilder } from "discord.js";
import { ProjectType } from "../utils/tokens";

const client = new discord.Client({ intents: [] });

client.login(process.env.DISCORD_TOKEN);

export const MODS_CHANNEL_ID = "1017814916083761206";
export const ROOTS_CHANNEL_ID = "1017819362977120327";
export const ICE64_CHANNEL_ID = "1017817342731886602";

function makeChannelId(channelId: string) {
  if (process.env.NODE_ENV === "production") return channelId;
  return MODS_CHANNEL_ID;
}

export const projectDiscordChannels: Record<ProjectType, string | undefined> = {
  UNKNOWN: undefined,
  ROOTS: makeChannelId(ROOTS_CHANNEL_ID),
  ICE64: makeChannelId(ICE64_CHANNEL_ID),
};

export async function sendDiscordMessage(
  project: ProjectType,
  message: string | discord.MessagePayload | discord.MessageCreateOptions
) {
  const channelId = projectDiscordChannels[project] || "";
  const channel = await client.channels.fetch(channelId);
  if (!channel) throw new Error("Channel not found");
  if (channel.isTextBased()) {
    try {
      await channel.send(message);
    } catch (error) {
      console.error(error);
    }
  }
}

interface PrintClaimEmbedOpts {
  project: ProjectType;
  tokenId: number;
  claimedAddress: string;
  claimedEns: string;
}

export const printClaimEmbed = ({
  project,
  tokenId,
  claimedAddress,
  claimedEns,
}: PrintClaimEmbedOpts) =>
  new EmbedBuilder({
    title: `Print claim for ${project} #${tokenId}`,
    url:
      project === "ROOTS"
        ? `https://roots.samking.photo/photo/${tokenId}`
        : undefined,
    fields: [
      {
        name: "Claimed by",
        value: `[${claimedEns}](https://etherscan.io/address/${claimedAddress})`,
      },
    ],
    ...(project === "ROOTS"
      ? {
          image: {
            url: `https://roots.samking.photo/photos/${tokenId}.jpg`,
            width: 500,
            height: 500,
          },
        }
      : {}),
  });
