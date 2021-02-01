import { useCriminals } from "../criminals/CriminalDataProvider.js"
import { NoteForm } from "../notes/NoteForm.js"

export const AlibisList = (criminal) => {
    const contentContainer = document.querySelector(".alibisContainer")
    const AlibiHTMLRepresentation = `
        <div id="alibi_modal" class="modal_parent">
            <div class="modal_content">
                <h1>Known Associates for ${criminal.name}</h1>
                ${criminal.known_associates.map(associate => {
                return `<section class="associate_container">
                <div class="associate_name">Associate name: ${associate.name}</div>
                <div class="associate_alibi">Associate alibi: ${associate.alibi}</div>
                </section>`
            }).join("")}
                <button id="modal_close">Close window</button>    
            </div>
        </div>`

    contentContainer.innerHTML = AlibiHTMLRepresentation
}

const eventHub = document.querySelector(".container")

eventHub.addEventListener("AlibisClicked", event => {
    const selectedCriminalId = event.detail.criminalId
    const criminalsArray = useCriminals()
    const selectedCriminal = criminalsArray.find((criminal) => criminal.id === selectedCriminalId)
    AlibisList(selectedCriminal)
})

eventHub.addEventListener("click", event => {
    if (event.target.id === "modal_close") {
        closeModal()
    }
})

const closeModal = () => {
    contentContainer.innerHTML = ""
    }