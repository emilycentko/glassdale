import { ShowAlibiButton } from "../alibis/AlibiButton.js"

export const Criminal = (criminal) => {
    return `
        <div class="criminals">
            <h3 class="criminal_name">${criminal.name}</h3>
            <p class="criminal_age">Age: ${criminal.age}</p>
            <p class="criminal_crime">Crime: ${criminal.conviction}</p>
            <p class="criminal_term_start">Term start: ${new Date(criminal.incarceration.start).toLocaleDateString('en-US')}</p>
            <p class="criminal_term_end">Term end: ${new Date(criminal.incarceration.end).toLocaleDateString('en-US')}</p>
            ${ShowAlibiButton(criminal)}
        </div>
    `
}