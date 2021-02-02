const contentTarget = document.querySelector(".criminalsButton")

const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "criminal_button") {
        const criminalsButtonClicked = new CustomEvent("criminalsClicked")
        eventHub.dispatchEvent(criminalsButtonClicked)
    }
})

export const CriminalsButton = () => {
    contentTarget.innerHTML = `<button id='criminal_button'>Display Criminals</button>`
}