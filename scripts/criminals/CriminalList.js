import { Criminal } from './Criminal.js'
import { getCriminals, useCriminals } from './CriminalDataProvider.js'
import { useConvictions } from './../convictions/ConvictionProvider.js'

const criminalsContainer = document.querySelector(".criminalsContainer")
const eventHub = document.querySelector(".container")

const renderToDom = (criminalCollection) => {
    let criminalsHTMLRepresentation = ""

    for (const criminal of criminalCollection) {
        criminalsHTMLRepresentation += Criminal(criminal)
    }

    criminalsContainer.innerHTML = `
                <h3>Glassdale Criminals</h3>
                <section class="criminalsList">
                ${criminalsHTMLRepresentation}
                </section>`
}

export const CriminalList = () => {
    getCriminals()
        .then(() => {
            const criminalsArray = useCriminals()
            renderToDom(criminalsArray)
        })
        
}

// Listen for the custom event you dispatched in ConvictionSelect
eventHub.addEventListener("crimeChosen", crimeChosenEvent => {
    // Use the property you added to the event detail.
    if (crimeChosenEvent.detail.crimeThatWasChosen !== "0"){

        // Get a copy of the arrray of convictions from the data provider
        const convictionsArray = useConvictions()

        // Use the find method to get the first object in the convictions array that has the same id as the id of the chosen crime
        const chosenConvictionObject = convictionsArray.find(convictionObj => {
        return convictionObj.id === parseInt(crimeChosenEvent.detail.crimeThatWasChosen)
      })

      // Get a copy of the array of criminals from the data provider
        const criminalsArray = useCriminals()

        /*
            Filter the criminals application state down to the people that committed the crime
        */
        const filteredCriminalsArray = criminalsArray.filter(criminalObj => criminalObj.conviction === chosenConvictionObject.name)

        /*
            Then invoke render() and pass the filtered collection as
            an argument
        */

        renderToDom(filteredCriminalsArray)
    }
})

eventHub.addEventListener("officerSelected", officerChosenEvent => {
    // How can you access the officer name that was selected by the user?
    const officerName = officerChosenEvent.detail.officer

    // How can you get the criminals that were arrested by that officer?
    const criminals = useCriminals()
    const filteredCriminalsArray = criminals.filter(
        criminalObject => {
            if (criminalObject.arrestingOfficer === officerName) {
                return true
            }
        }
    )

    renderToDom(filteredCriminalsArray)
})