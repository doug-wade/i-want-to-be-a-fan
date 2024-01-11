const EleventyFetch = require("@11ty/eleventy-fetch");
const tybaltPlugin = require("@tybalt/eleventy-plugin");
const { toKebabCase } = require("js-convert-case");
const Client = require("itscalledsoccer").default;

const client = new Client();

const escapeJson = (value) => {
  if (typeof value === "object") {
    return JSON.stringify(value).replaceAll('"', "&quot;");
  } else {
    return new String(value);
  }
};
const toAttributes = (obj) => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    return `${acc} ${toKebabCase(key)}="${escapeJson(value)}"`;
  }, "");
};

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(tybaltPlugin, {
    pattern: "js/*.mjs"
  });
  eleventyConfig.addAsyncShortcode("asa", async function (playerName) {
    const res = await fetchAsaPlayerData(playerName);
    if (!res) {
      return "";
    }
    return `<asa-card ${toAttributes(res)}></asa-card>`;
  });
};

async function fetchAsaPlayerData(playerName) {
  if (!playerName) {
    return;
  }

  return EleventyFetch(
    async () => {
      const leagues = ["nwsl"];
      const names = [playerName];
      const [player] = await client.getPlayersByName({ names, leagues });

      const responses = await Promise.all([
        client.getPlayersXgoals({
          playerId: player.players[0],
        }),
        client.getPlayersXpass({
          playerId: player.players[0],
        }),
        client.getPlayersGoalsAdded({
          playerId: player.players[0],
        }),
      ]);

      return responses.reduce((acc, [elem]) => ({ ...acc, ...elem }), {});
    },
    {
      duration: "1d",
      type: "json",
      formatUrlForDisplay() {
        return `getPlayers-${toKebabCase(playerName)}`;
      },
    }
  );
}
