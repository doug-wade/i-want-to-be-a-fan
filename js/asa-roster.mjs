import { defineComponent, html } from "@tybalt/core";
import { derive, reactive } from "@tybalt/reactive";
import { toKebabCase } from "js-convert-case";

export default defineComponent({
    name: 'asa-roster',
    props: {
        roster: {
            required: true,
        }
    },
    setup({ roster }) {
        const searchTerm = reactive("")
        const handleChange = (event) => {
            searchTerm.value = event.target.value;
        };
        const filtered = derive([searchTerm, roster], ([searchTerm, roster]) => {
            if (!roster) {
                return [];
            }

            return roster.filter((player) => {
                return player.name.toLowerCase().includes(searchTerm.toLowerCase());
            });
        });
        return {
            handleChange,
            roster,
            filtered,
            searchTerm,
        }
    },
    render({ handleChange, filtered, searchTerm }) {
        return html`
            <label>
                <span>Search</span>
                <input type="text" id="search" placeholder="Search for a player" @change="${handleChange}" value="${searchTerm}">
            </label>
            <span>search term: ${searchTerm}</span>
            <ul>
                ${filtered.value.map((player) => {
                    return html`<li>
                        <a href="player/${toKebabCase(player.name)}/index.html">${player.name}</a>
                    </li>`;
                })}
            </ul>
        `;
    }
})