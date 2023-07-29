import type { CommandInteraction } from "discord.js";
import { HibikiEvent } from "../classes/Event.js";
import { HibikiColors } from "$shared/constants.js";
import { defaultLocale } from "$shared/i18n.js";
import util from "node:util";

export class HibikiInteractionEvent extends HibikiEvent {
  events: HibikiEventListener[] = ["interactionCreate"];

  public async run(_event: HibikiEventListener[], interaction: CommandInteraction) {
    // Don't run any interactions that aren't commands or that don't actually exist
    if (!interaction?.commandName) return;

    // Searches for the right command to run
    const command = this.bot.commands.get(interaction.commandName);
    if (!command) return;

    // Gets the user's locale and appends it into CommandInteraction
    const userConfig = await this.bot.db.getUserConfig(interaction.user?.id);
    interaction.lng = userConfig?.locale ?? defaultLocale;

    try {
      // Defers the command for a followup. If ephemeral is set, set the flag
      await interaction.deferReply({ ephemeral: command.ephemeral });

      // Runs the command
      await command.runWithInteraction?.(interaction);
    } catch (error) {
      await interaction.followUp({
        embeds: [
          {
            // TODO: Not throw the entire stack - no-no!
            title: `❌ Error while running ${command.name}`,
            description: "```TS\n" + `${(error as Error).stack}` + "```",
            color: HibikiColors.ERROR,
            footer: {
              // TODO: Localise
              text: "Found a bug? - https://github.com/espimarisa/hibiki/issues",
            },
          },
        ],
      });

      throw new Error(util.inspect(error));
    }
  }
}
