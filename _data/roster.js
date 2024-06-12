const EleventyFetch = require("@11ty/eleventy-fetch");
const jsdom = require("jsdom");

const { JSDOM } = jsdom;

module.exports = async function() {
  const url = "https://www.ussoccer.com/teams/uswnt/roster";
  const response = await EleventyFetch(url, {
    duration: "1d",
    type: "text"
  });

  const dom = new JSDOM(response);
  const playerDivs = dom.window.document.querySelectorAll("div.col.col--xs-6.col--sm-4.col--md-3");

  return Array.from(playerDivs).map((playerDiv) => {
    const nameAndNumber = playerDiv.querySelector("div.PlayerThumbnail_playerName__iCojI");
    const nameAndNumberArray = nameAndNumber.innerHTML.split(/<!-- --> <!-- --> <!-- -->/);
    const number = nameAndNumberArray.shift();
    const name = nameAndNumberArray.join(" ");

    const anchor = playerDiv.querySelector("a");
    const link = anchor.getAttribute("href");

    const img = playerDiv.querySelector("img");
    const imgSrc = img.getAttribute("src");

    return {
        name,
        number,
        link,
        img: imgSrc
    }
  })
}
