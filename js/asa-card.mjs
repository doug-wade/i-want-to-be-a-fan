import { defineComponent, html } from "@tybalt/core";
import { toSentenceCase } from "js-convert-case";

const props = {
  generalPosition: {},
  minutesPlayed: {},
  shots: {},
  shotsOnTarget: {},
  keyPasses: {},
  xgoals: {},
  xplace: {},
  goalsMinusXgoals: {},
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
  data: {},
};

export default defineComponent({
  name: 'asa-card',
  props,
  render(renderProps) {
    return html`
      <div>
        ${Object.keys(props)
          .filter((key) => !["data"].includes(key))
          .map(
            (key) => {
              const renderProp = renderProps[key];
              if (key && renderProp && renderProp.value) {
                return html`<p>
                  <span class="label">${toSentenceCase(key)}:</span> ${renderProp}
                </p>`
              }
              
              return html``;
            }
          )}
      </div>
    `;
  }
});
