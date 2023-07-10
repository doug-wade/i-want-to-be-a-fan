import { LitElement, html, css } from "lit";
import { toKebabCase, toSentenceCase } from "js-convert-case";

let properties = {};
const caseProps = (props) => {
  properties = Object.fromEntries(
    Object.entries(props).map(([key, value]) => {
      return [key, { ...value, attribute: toKebabCase(key) }];
    })
  );
  return properties;
};

class AsaCard extends LitElement {
  static styles = css`
    .label {
      font-weight: 600;
    }
  `;

  static properties = caseProps({
    generalPosition: {},
    minutesPlayed: {},
    shots: {},
    shotsOnTarget: {},
    keyPasses: {},
    xgoals: {},
    xplace: {},
    goalsMinusXgoals: {},
    keyPasses: {},
    primaryAssists: {},
    xassists: {},
    primaryAssistsMinusXassists: {},
    xgoalsPlusXassists: {},
    pointsAdded: {},
    xpointsAdded: {},
    attemptedPasses: {},
    passCompletionPercentage: {},
    xpassCompletionPercentage: {},
    passesCompletedOverExpected: {},
    passesCompletedOverExpectedP100: {},
    avgDistanceYds: {},
    avgVerticalDistanceYds: {},
    shareTeamTouches: {},
    countGames: {},
    data: { type: Object },
  });

  render() {
    return html`
      <div>
        ${Object.keys(properties)
          .filter((key) => !["data"].includes(key))
          .map(
            (key) =>
              html`<p>
                <span class="label">${toSentenceCase(key)}:</span> ${this[key]}
              </p>`
          )}
      </div>
    `;
  }
}
customElements.define("asa-card", AsaCard);
