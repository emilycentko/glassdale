let witnesses = []

export const getWitnesses = () => {
    return fetch("https://criminals.glassdale.us/witnesses")
        .then(response => response.json())
        .then(
            parsedResponse => {
                console.table(parsedResponse)
                witnesses = parsedResponse
            })
}

export const useWitnesses = () => {
    return witnesses.slice()
}