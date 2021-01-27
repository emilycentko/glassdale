import { useOfficers, getOfficers } from "./OfficerDataProvider.js"

const eventHub = document.querySelector(".container")

// Get a reference to the DOM element where the <select> will be rendered
const contentTarget = document.querySelector(".filters__officer")

eventHub.addEventListener("change", changeEvent => {
    if (changeEvent.target.id === "officerSelect") {
        // Get the name of the selected officer
        const selectedOfficer = changeEvent.target.value

        // Define a custom event
        const customEvent = new CustomEvent("officerSelected", {
            detail: {
                officer: selectedOfficer
            }
        })

        // Dispatch event to event hub
        eventHub.dispatchEvent(customEvent)
    }
})

export const OfficerSelect = () => {
    // Trigger fetching the API data and loading it into application state
    getOfficers()
    .then( () => {
      // Get all convictions from application state
      const officers = useOfficers()
      render(officers)
    })
}

const render = officerCollection => {
    
    contentTarget.innerHTML = `
        <select class="dropdown" id="officerSelect">
            <option value="0">Please select an officer...</option>
            ${
                officerCollection.map(officerObject => {
                    const officersDropdown = officerObject.name
                    return `<option value="${officerObject.name}">${officersDropdown}</option>`
                })
            }
        </select>
    `
}