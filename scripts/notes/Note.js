export const NoteHTMLConverter = (noteObject, relatedCriminal) => {
    return `
        <section class="note">
        <h3>Note about ${relatedCriminal.name}</h3>
        <div class="note__date">Date: ${noteObject.date}</div>   
        <div class="note__text">${noteObject.text}</div>
        <div class="note__author">Author: ${noteObject.author}</div>
        <button id="deleteNote--${noteObject.id}">Delete</button>
        </section>
    `
}