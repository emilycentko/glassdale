import { getNotes, useNotes } from "./NoteDataProvider.js";
import { NoteHTMLConverter } from "./Note.js";
import { useCriminals, getCriminals } from '../criminals/CriminalDataProvider.js'

// Query the DOM for the element that your notes will be added to 
const contentTarget = document.querySelector(".noteList")

const eventHub = document.querySelector(".container")


// Event to render Saved Notes after button clicked
eventHub.addEventListener("showNotesClicked", customEvent => {
    NoteList()
})


// Render saved notes

// const render = (noteArray, criminalCollection) => {
//     const allNotesConvertedToStrings = noteArray.map(noteObject => {
//          // Find the related criminal
//     const relatedCriminal = criminalCollection.find(criminal => criminal.id === noteObject.criminalId)
//     // convert the notes objects to HTML with NoteHTMLConverter
//     contentTarget.innerHTML = `
//             <section class="notesList">
//                 <h3>Note about ${relatedCriminal.name}</h3>
//                 ${allNotesConvertedToStrings}
//             </section>
//         `
//     }).join("")
// }

/* <section class="notesList">
<h3>Note about ${relatedCriminal.name}</h3>
<p>${noteObject.date}</p>
<p>${noteObject.author}</p>
<p>${noteObject.text}</p>
</section>
` }*/

const render = (noteArray, criminalCollection) => {
    const allNotesConvertedToStrings = noteArray.map(noteObject => {
         // Find the related criminal
         const relatedCriminal = criminalCollection.find(criminal => criminal.id === noteObject.criminalId)
    // convert the notes objects to HTML with NoteHTMLConverter
    return NoteHTMLConverter(noteObject, relatedCriminal)
    }).join("")

    contentTarget.innerHTML = `
            <section class="notesList">
                ${allNotesConvertedToStrings}
            </section>
        `
}

// Standard list function you're used to writing by now. BUT, don't call this in main.js! Only will render once button is clicked

export const NoteList = () => {
    getNotes()
    .then(getCriminals)    
    .then(() => {
            const allNotes = useNotes()
            const allcriminals = useCriminals()
            render(allNotes, allcriminals)
        })
}

eventHub.addEventListener("noteStateChanged", event => {
    if (contentTarget.innerHTML !== "") {
    NoteList()
    }
})