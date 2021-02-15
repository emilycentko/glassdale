import { useFacilities, getFacilities } from "./FacilityProvider.js"
import { useCriminalFacilities, getCriminalFacilities } from "./CriminalFacilityProvider.js"
import { Facility } from "./Facility.js"
import { useCriminals, getCriminals } from "./../criminals/CriminalDataProvider.js"

const contentTarget = document.querySelector(".facilitiesContainer")
const eventHub = document.querySelector(".container")

const renderToDom = (criminalCollection, allFacilities, allRelationships) => {
    // Step 1 - Iterate all facilities
    contentTarget.innerHTML = allFacilities.map((facility) => {
            // Step 2 - Filter all relationships to get only ones for this facility
            const criminalRelationshipsForThisFacility = allRelationships.filter(cf => cf.facilityId === facility.id)

            // Step 3 - Convert the relationships to criminals with map()
            const criminals = criminalRelationshipsForThisFacility.map(cf => {
                const matchingCriminalObject = criminalCollection.find(criminal => criminal.id === cf.criminalId)
                return matchingCriminalObject
            })

            // Must pass the matching facilities to the Facility component
            return Facility(facility, criminals)
        }
    ).join("")}

export const FacilitiesList = () => {
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

eventHub.addEventListener("facilitiesButtonClicked", facilitiesButtonClicked => {
    console.log("click happened", facilitiesButtonClicked)
    FacilitiesList()
})

eventHub.addEventListener("facilitiesButtonClicked", () => {
    contentTarget.innerHTML = ""
})