/**
 * @file Index
 * @description General global typings
 * @typedef index
 */

// Privately imports dependency types
type PrivateClientEvents = import("discord.js").ClientEvents;
type PrivateIntentsString = import("discord.js").IntentsString;

// Hibiki event emitters
type HibikiEventEmitter = keyof PrivateClientEvents;

// Global Discord snowflake type
type DiscordSnowflake = import("discord.js").Snowflake;

// Valid locale codes. This list will need to be updated manually.
type HibikiLocaleCode = "en-GB";

// A resolvable string of intents
type ResolvableIntentString = import("discord.js").BitFieldResolvable<PrivateIntentsString, number>;
