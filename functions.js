/*
Funkce pro použití při odeslání formuláře;
Ukládá do localStorage jméno z formuláře
*/
const saveNames = (oneName) => {
    localStorage.setItem("names", JSON.stringify(oneName))
}


/* Generování HTML struktury, kterou umístíme do stránky po kliknutí na tlačítko "Vypiš"
+ použijeme ji také pro vypsání nových informací z localStorage, když nějaké jméno vymažeme pomocí tlačítka "Vymazat jméno"
*/
const generateHTMLstructure = (oneName) => {
    const newDiv = document.createElement("div")
    const newLink = document.createElement("a")
    const button = document.createElement("button")

    // nastavení mazacího tlačítka
    button.textContent = "Vymazat jméno"
    newDiv.appendChild(button)

    button.addEventListener("click", (event) => {
        removeNames(oneName.id)
        saveNames(names)
        toListAgain()
    })

    newLink.textContent = oneName.firstName
    newLink.classList.add(oneName.adult ? "adult" : "no-adult")
    newLink.setAttribute("href", `/edit.html#${oneName.id}`)

    newDiv.appendChild(newLink)

    return newDiv
}


/*
    Podle ID najdeme index daného jména a pomocí splice ho odstraníme
*/
const removeNames = (id) => {
    const index = names.findIndex((nameWantToCheck) => {
        return nameWantToCheck.id === id
    })
    
    if(index > -1){
        names.splice(index,1)
    }
}


/*
    Pokud smažeme nějaké jméno z localStorage, tak tato funkce zabezpečí opětovné vypsání localStorage (tedy vypsání bez smazaného jména)
*/
const toListAgain = () => {
    document.querySelector(".list-names").innerHTML = ""

    let newData = getSavedNames()

    newData.forEach((onlyOneName) => {
        const newContent = generateHTMLstructure(onlyOneName)
        document.querySelector(".list-names").appendChild(newContent)
    })
}