import { HibikiShardingManager } from "$classes/Sharder.ts";
import env from "$shared/env.ts";
import initSentry from "$shared/sentry.ts";

import "$shared/i18n.ts";

// Tries to initialize Sentry
initSentry();

const HIBIKI_INDEX_FILE = `${import.meta.dir}/hibiki.ts`;

// Creates a new sharding manager
const manager = new HibikiShardingManager(HIBIKI_INDEX_FILE, env.BOT_TOKEN, "auto");
manager.spawn();
