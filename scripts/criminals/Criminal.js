import { ShowAlibiButton } from "../alibis/AlibiButton.js"

export const Criminal = (criminal, facilities) => {
    return `
    <div class="criminal">
        <h3>${criminal.name}</h3>
        <div class="criminal__details">
            <p>Convicted for ${criminal.conviction}</p>
            <p>Arrested by ${criminal.arrestingOfficer}</p>
            <p>Incarcerated between:
                ${new Date(criminal.incarceration.start).toLocaleDateString()} and
                ${new Date(criminal.incarceration.end).toLocaleDateString()}
            </p>
            <p>Age: ${criminal.age}</p>
            <div>
                <h4>Facilities</h4>
                <ul>
                    ${facilities.map(f => `<li>${f.facilityName}</li>`).join("")}
                </ul>
            </div>
            ${ShowAlibiButton(criminal)}
        </div>
    </div>
    `
}