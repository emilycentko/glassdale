const contentTarget = document.querySelector(".facilitiesButton")

const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "facilities_button") {
        const facilitiesButtonClicked = new CustomEvent("facilitiesButtonClicked")
        eventHub.dispatchEvent(facilitiesButtonClicked)
    }
})

export const FacilitiesButton = () => {
    contentTarget.innerHTML = `<button id='facilities_button'>Display Facilities</button>`
}