import { useWitnesses, getWitnesses } from "./WitnessDataProvider.js"
import { Witness } from "./Witness.js"

const contentTarget = document.querySelector(".witnessesContainer")
const eventHub = document.querySelector(".container")

const render = (witnessArray) => {
    let witnessStatementsHTMLRepresentation = ""
    for (const witness of witnessArray)

    witnessStatementsHTMLRepresentation += Witness(witness)

    contentTarget.innerHTML = `
    <h3>Witness Statements</h3>    
        <div class="witness_statements>
            ${witnessStatementsHTMLRepresentation}
        </div>
    `
}

const WitnessList = () => {
    getWitnesses()
    .then(() => {
        const allWitnesses = useWitnesses()
        render(allWitnesses)
    })
}

eventHub.addEventListener("witnessesClicked", witnessesButtonClicked => {
    WitnessList()
})

eventHub.addEventListener("criminalsClicked", () => {
    contentTarget.innerHTML = ""
})