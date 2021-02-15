import { Criminal } from './Criminal.js'
import { getCriminals, useCriminals } from './CriminalDataProvider.js'
import { useConvictions } from './../convictions/ConvictionProvider.js'
import { getCriminalFacilities, useCriminalFacilities } from './../facility/CriminalFacilityProvider.js'
import { getFacilities, useFacilities } from './../facility/FacilityProvider.js'

const criminalsContainer = document.querySelector(".criminalsContainer")
const eventHub = document.querySelector(".container")

// const renderToDom = (criminalCollection) => {
//     let criminalsHTMLRepresentation = ""

//     for (const criminal of criminalCollection) {
//         criminalsHTMLRepresentation += Criminal(criminal)
//     }

//     criminalsContainer.innerHTML = `
//                 <h2>Glassdale Criminals</h2>
//                 <section class="criminalsList">
//                 ${criminalsHTMLRepresentation}
//                 </section>`
// }

const renderToDom = (criminalCollection, allFacilities, allRelationships) => {
    // Step 1 - Iterate all criminals
    criminalsContainer.innerHTML = criminalCollection.map((criminal) => {
            // Step 2 - Filter all relationships to get only ones for this criminal
            const facilityRelationshipsForThisCriminal = allRelationships.filter(cf => cf.criminalId === criminal.id)

            // Step 3 - Convert the relationships to facilities with map()
            const facilities = facilityRelationshipsForThisCriminal.map(cf => {
                const matchingFacilityObject = allFacilities.find(facility => facility.id === cf.facilityId)
                return matchingFacilityObject
            })

            // Must pass the matching facilities to the Criminal component
            return Criminal(criminal, facilities)
        }
    ).join("")}

export const CriminalList = () => {
    // getCriminals()
    //     .then(() => {
    //         const criminalsArray = useCriminals()
    //         renderToDom(criminalsArray)
    //     })
    getFacilities()
        .then(getCriminalFacilities)
        .then(getCriminals)
        .then(() => {
            // Pull in the data now that it has been fetched
            const facilities = useFacilities()
            const crimFac = useCriminalFacilities()
            const criminals = useCriminals()

            // Pass all three collections of data to render()
            renderToDom(criminals, facilities, crimFac)
        })
}

// Filter by crime //

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

// Filter by officer //

eventHub.addEventListener("officerSelected", officerChosenEvent => {
    if (officerChosenEvent.detail.officer !== "0") {
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
    }
})

// display witness list once button clicked

eventHub.addEventListener("witnessesClicked", () => {
    criminalsContainer.innerHTML = ""
})

// display facilities list once button clicked
eventHub.addEventListener("facilitiesButtonClicked", () => {
    criminalsContainer.innerHTML = ""
})

// display criminals list once button is clicked

eventHub.addEventListener("criminalsClicked", () => CriminalList())