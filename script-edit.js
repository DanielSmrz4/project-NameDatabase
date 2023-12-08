let nameID = location.hash.substring(1)

// Funkce pro vytáhnutí uložených polí v localStorage
const getSavedNames = () => {
    const myNames = localStorage.getItem("names")

    if(myNames !== null){
        return JSON.parse(myNames)
    } else {
        return []
    }
}
let names = getSavedNames()


let searchedName = names.find((oneObject) => oneObject.id === nameID)

if(searchedName === undefined){
    location.assign("/index.html")
}

document.querySelector("#editedName").value = searchedName.firstName

let changingForm = document.querySelector("#changing-form")
changingForm.addEventListener("submit", (event) => {
    event.preventDefault()

    searchedName.firstName = event.target.elements.changingName.value

    saveNames(names)
})