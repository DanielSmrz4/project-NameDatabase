// Načtení data z localStorage do proměnné names; pokud je localStorage prázdný, tak do names se uloží prázdné pole
const getSavedNames = () => {
    const myNames = localStorage.getItem("names")

    if(myNames !== null){
        return JSON.parse(myNames)
    } else {
        return []
    }
}

const names = getSavedNames()

// Odeslání formuláře a uložení do localStorage pomocí names
let myForm = document.querySelector("#test-form")
let myCheckbox = document.querySelector(".my-checkbox")

myForm.addEventListener("submit", (event) => {
    event.preventDefault()

    names.push({
        id: uuidv4(),
        firstName: event.target.elements.firstName.value,
        adult: myCheckbox.checked
    })

    event.target.elements.firstName.value = ""
    myCheckbox.checked = false

    saveNames(names)
})

// Vypisování zpět do stránky
let toList = document.querySelector(".to-list")
toList.addEventListener("click", (event) => {
    document.querySelector(".list-names").innerHTML = ""

    let namesFromStorage = JSON.parse(localStorage.getItem("names"))

    namesFromStorage.forEach((oneName) => {
        const oneNameHTML = generateHTMLstructure(oneName)
        document.querySelector(".list-names").appendChild(oneNameHTML)
    })
})

window.addEventListener("storage", (event) => {
    location.reload()
})
