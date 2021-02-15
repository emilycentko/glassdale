export const Facility = (facility, criminals) => {
    return `
    <div class="facility">
        <h3>${facility.facilityName}</h3>
        <div class="facility__details">
            <p>Security Level: ${facility.securityLevel}</p>
            <p>Capacity: ${facility.capacity}</p>
            <div>
                <h4>Criminals</h4>
                <ul>
                    ${criminals.map(criminal => `<li>${criminal.name}</li>`).join("")}
                </ul>
            </div>
        </div>
    </div>
    `
}