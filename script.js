const fromText = document.querySelector(".from-text"),
toText = document.querySelector('.to-text'),
selectTag = document.querySelectorAll("select"),
exchangeBtn = document.querySelector(".exchange"),
translateBtn = document.querySelector('button'),
icons = document.querySelectorAll('.row i')


selectTag.forEach((tag, id) => {
    for(const country_code in countries){
        let selected;
    if(id == 0 && country_code == 'en-GB'){
        selected = 'selected'
    }
    else if(id == 1 && country_code == 'hi-IN'){
        selected = 'selected'
    }
        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`
        tag.insertAdjacentHTML('beforeend', option)
    }
})

exchangeBtn.addEventListener('click', () => {
    let tempText = fromText.value
    fromText.value = toText.value
    toText.value = tempText
    let tempLang = selectTag[0].value
    selectTag[0].value = selectTag[1].value
    selectTag[1].value = tempLang
})

translateBtn.addEventListener('click', () => {
    let text = fromText.value,
    traslateFrom = selectTag[0].value,
    traslateTo = selectTag[1].value
    if(!text) return
    toText.setAttribute('placeholder', 'Translating...')
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${traslateFrom}|${traslateTo}`
    fetch(apiUrl).then(resp => resp.json()).then(response => {
        toText.value = response.responseData.translatedText
        toText.setAttribute('placeholder','Translating...')
    })
})

icons.forEach(icon => {
    icon.addEventListener('click', ({target}) => {
        console.log(target)
        if(target.classList.contains('bi-clipboard')){
            if(target.id === 'from'){
                navigator.clipboard.writeText(fromText.value)
            }
            else{
                navigator.clipboard.writeText(toText.value)
            }
        }
        else{
            let utternace
            if(target.id  === 'from'){
                utternace = new SpeechSynthesisUtterance(fromText.value)
            }
            else{
                utternace = new SpeechSynthesisUtterance(toText.value)
            }
            speechSynthesis.speak(utternace)
        }
    })
})