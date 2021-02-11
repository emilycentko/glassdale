import "./AlibiList.js"

export const ShowAlibiButton = (criminal) => {
    return `<button id="associates--${criminal.id}">Associate Alibis</button>`
}

const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", event => {

    if(event.target.id.startsWith("associates--")){
        const [prefix, criminalId]= event.target.id.split("--")
        const customEvent = new CustomEvent("AlibisClicked", {
            detail: {
                criminalId: parseInt(criminalId)
            }
        })
        eventHub.dispatchEvent(customEvent)
    }
})



