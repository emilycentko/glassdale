/*
 *   ConvictionSelect component that renders a select HTML element
 *   which lists all convictions in the Glassdale PD API
 */

import { useConvictions, getConvictions } from "./ConvictionProvider.js"

/*
    Which element in your HTML contains all components?
    That's your Event Hub. Get a reference to it here.
*/
const eventHub = document.querySelector(".container")

// Get a reference to the DOM element where the <select> will be rendered
const contentTarget = document.querySelector(".filters__crime")

// On the event hub, listen for a "change" event.
eventHub.addEventListener("change", changeEvent => {

    // Only do this if the `crimeSelect` element was changed
    if (changeEvent.target.id === "crimeSelect") {
        // Create custom event. Provide an appropriate name.
        const customEvent = new CustomEvent("crimeChosen", {
            detail: {
                crimeThatWasChosen: changeEvent.target.value
            }
        })

        // Dispatch to event hub
        eventHub.dispatchEvent(customEvent)
    }
})

export const ConvictionSelect = () => {
    // Trigger fetching the API data and loading it into application state
    getConvictions()
    .then( () => {
      // Get all convictions from application state
      const convictions = useConvictions()
      render(convictions)
    })
}

const render = convictionsCollection => {
    /*
        Use interpolation here to invoke the map() method on
        the convictionsCollection to generate the option elements.
        Look back at the example provided above.
    */
    contentTarget.innerHTML = `
        <select class="dropdown" id="crimeSelect">
            <option value="0">Please select a crime...</option>
            ${
                convictionsCollection.map(convictionObject => {
                    const convictionsDropdown = convictionObject.name
                    return `<option value="${convictionObject.id}">${convictionsDropdown}</option>`
                })
            }
        </select>
    `
}