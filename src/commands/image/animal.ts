import type { APIApplicationCommandOption } from "discord-api-types/v10";
import type { ChatInputCommandInteraction } from "discord.js";
import { HibikiCommand } from "../../classes/Command.js";
import fetch from "../../utils/fetch.js";
import { localiseAnimalCommandTitle } from "../../utils/localiser.js";
import { ApplicationCommandOptionType } from "discord-api-types/v10";

export type ANIMAL_TYPES = "cat" | "dog" | "fox";

export class AnimalCommand extends HibikiCommand {
  description = "Sends a random picture of a selected type of animal.";

  options: APIApplicationCommandOption[] = [
    {
      name: "type",
      description: "The type of animal to get a picture of.",
      type: ApplicationCommandOptionType.SubcommandGroup,
      options: [
        {
          name: "cat",
          description: "Sends a random picture of a cat.",
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: "dog",
          description: "Sends a random picture of a dog.",
          type: ApplicationCommandOptionType.Subcommand,
        },
        {
          name: "fox",
          description: "Sends a random picture of a fox.",
          type: ApplicationCommandOptionType.Subcommand,
        },
      ],
    },
  ];

  public async runWithInteraction(interaction: ChatInputCommandInteraction) {
    const subcommand = interaction.options.getSubcommand() as ANIMAL_TYPES | null;

    // Handler for if no option was provided
    if (!subcommand) {
      await interaction.reply({
        embeds: [
          {
            title: interaction.getString("global.ERROR"),
            description: interaction.getString("image.COMMAND_ANIMAL_NOSUBCOMMAND"),
            color: this.bot.config.colours.error,
          },
        ],
      });

      return;
    }

    // Returns a URL
    const animalURL = await this.getSubCommandResponse(subcommand);
    if (!animalURL) {
      await interaction.reply({
        embeds: [
          {
            title: interaction.getString("global.ERROR"),
            description: interaction.getString("image.COMMAND_IMAGE_FAILED"),
            color: this.bot.config.colours.error,
          },
        ],
      });

      return;
    }

    // Gets locale
    const animalLocaleData = localiseAnimalCommandTitle(interaction.getString, subcommand);

    // Sends the image
    await interaction.reply({
      embeds: [
        {
          title: animalLocaleData[0],
          color: this.bot.config.colours.primary,
          image: {
            url: animalURL,
          },
          footer: {
            icon_url: this.bot.user?.displayAvatarURL(),
            text: animalLocaleData[1] ?? "",
          },
        },
      ],
    });
  }

  public async getSubCommandResponse(commandName: string): Promise<string | undefined> {
    switch (commandName) {
      /**
       * Gets a picture of a cat
       */

      case "cat": {
        const body = await fetch("https://aws.random.cat/meow");
        if (!body) return;
        return body?.file;
      }

      /**
       * Gets a picture of a dog
       */

      case "dog": {
        const body = await fetch("https://random.dog/woof.json");
        if (!body) return;
        return body?.url;
      }

      /**
       * Gets a picture of a fox
       */

      case "fox": {
        const body = await fetch("https://randomfox.ca/floof/");
        if (!body) return;
        return body?.image;
      }

      default:
        return;
    }
  }
}
