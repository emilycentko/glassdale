import { Criminal } from './Criminal.js'
import { getCriminals, useCriminals } from './CriminalDataProvider.js'

const criminalsContainer = document.querySelector(".criminalsContainer")

export const CriminalList = () => {
    getCriminals()
        .then(() => {
            const criminalArray = useCriminals()

            let criminalsHTMLRepresentation = ""

            for (const criminal of criminalArray) {
                criminalsHTMLRepresentation += Criminal(criminal)
            }

            criminalsContainer.innerHTML = `
                <h3>Glassdale Criminals</h3>
                <section class="criminalsList">
                ${criminalsHTMLRepresentation}
                </section>`
        })
        
}