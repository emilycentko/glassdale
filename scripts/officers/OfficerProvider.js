let officers = []

export const useOfficers = () => {
    return officers.slice()
}

export const getOfficers = () => {
    return fetch("https://criminals.glassdale.us/officers")

    // .then = won't run until fetch to finish, then JS will call it for you, no need to call
    // (make HTTP request, then when that is done, execute function)
    // single-line function - everthing inside the () is a function declaration

        .then(response => response.json())
        .then(
            parsedOfficers => {
                console.table(parsedOfficers)
                officers = parsedOfficers
            }
        )
}

    // cannot access data in the code until you have response from JSON
    // data returned from fetch call converted into JSON, then resurned is implicit, and whatever is returned is returned into parameter of 2nd .then