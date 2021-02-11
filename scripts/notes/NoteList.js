import { getNotes, useNotes } from "./NoteDataProvider.js";
import { NoteHTMLConverter } from "./Note.js";
import { useCriminals, getCriminals } from '../criminals/CriminalDataProvider.js'

// Query the DOM for the element that your notes will be added to 
const contentTarget = document.querySelector(".noteList")
// Define ye olde Evente Hubbe
const eventHub = document.querySelector(".container")

eventHub.addEventListener("showNotesClicked", customEvent => {
    NoteList()
})

const render = (noteArray, criminalCollection) => {
    contentTarget.innerHTML = noteArray.map(noteObject => {
         // Find the related criminal
         const relatedCriminal = criminalCollection.find(criminal => criminal.id === parseInt(noteObject.criminal))
    // convert the notes objects to HTML with NoteHTMLConverter
    return `
            <section class="notesList">
                <h2>Note about ${relatedCriminal.name}</h2>
                ${noteObject.text}
            </section>
        `
    }).join("")
}

// Standard list function you're used to writing by now. BUT, don't call this in main.js! Why not?
export const NoteList = () => {
    getNotes()
    .then(getCriminals)    
    .then(() => {
            const allNotes = useNotes()
            const criminals = useCriminals()
            render(allNotes, criminals)
        })
}

eventHub.addEventListener("noteStateChanged", event => {
    if (contentTarget.innerHTML !== "") {
    NoteList()
}
})