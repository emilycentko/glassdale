const contentTarget = document.querySelector(".witnessesButton")

const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "witness_button") {
        const witnessesButtonClicked = new CustomEvent("witnessesClicked")
        eventHub.dispatchEvent(witnessesButtonClicked)
    }
})

export const WitnessesButton = () => {
    contentTarget.innerHTML = `<button id='witness_button'>Witness Statements</button>`
}