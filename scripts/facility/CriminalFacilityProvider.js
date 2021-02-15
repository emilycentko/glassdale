// provider for the relationship data between criminals and facilities

let criminalFacilities = []

export const useCriminalFacilities = () => {
    return criminalFacilities.slice()
}

export const getCriminalFacilities = () => {
    return fetch("https://criminals.glassdale.us/criminalFacilities?_expand=criminal")
        .then(response => response.json())
        .then(apiData => {
            criminalFacilities = apiData
        })
}