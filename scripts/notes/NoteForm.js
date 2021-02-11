import { saveNote } from "./NoteDataProvider.js"
import { useCriminals } from "../criminals/CriminalDataProvider.js"

const contentTarget = document.querySelector(".noteFormContainer")
const eventHub = document.querySelector(".container")

const render = () => {
    const criminalCollection = useCriminals()
    contentTarget.innerHTML = `
        <select id="note--criminal" class="criminalSelect">
        ${criminalCollection.map(criminal => `<option value="${criminal.id}">${criminal.name}</option>`)}
        </select>   
            
        <label for="note-text">Note: </label>
        <input type="text" id="note--text">

        <label for="note-date">Date of Note: </label>
        <input type="text" id="note--date">

        <label for="note-author">Author: </label>
        <input type="text" id="note--author">

        <button id="saveNote">Save Note</button>
    `
}

export const NoteForm = () => {
    render()
}

// Handle browser-generated click event in component
eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveNote") {
        const criminal = document.getElementById("note--criminal").value
        const text = document.getElementById("note--text").value
        const date = document.getElementById("note--date").value
        const author = document.getElementById("note--author").value

        // Make a new object representation of a note
        const newNote = {
            // Key/value pairs here
            text: text,
            date: date,
            criminal: criminal,
            author: author
        }

        // Change API state and application state
        saveNote(newNote)
    }
})