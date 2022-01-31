import UI from './js/ui.js';

async function getData(language, word) {
    UI.setInformation('Buscando', 2);

    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/${language}/${word}`);

    if (response.status >= 200 && response.status < 400) {
        const datas = await response.json();

        const {meanings, origin = '', phonetic = '', phonetics} = datas[0];
        const {audio} = phonetics[0];
        const {definitions = '', partOfSpeech = ''} = meanings[0];
        const {definition = '', example = ''} = definitions[0];
    
        UI.createCard(word, partOfSpeech, phonetic, audio, origin, definition, example);
        
    } else if (response.status >= 400 && response.status < 500) {
        UI.setInformation('We can\'t find the word you entered 😔, make sure the language is correct', 3);

    } else if (response.status >= 500) {
        UI.setInformation('Apparently we are having server problems 🤡!', 1)
        
    }
}


/* Search */
const searchBar = document.getElementById('search-bar');
const searchButton = document.querySelector('.search-button');

searchButton.addEventListener('click', () => {
    getData(UI.language, searchBar.value);
});

searchBar.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') getData(UI.language, searchBar.value);
});

const languageSelector = document.getElementById('language-selector');
languageSelector.addEventListener('click', () => {
    UI.setLanguage();
})


/* History */
const historyButton = document.getElementById('history-button-cont');
const history = document.querySelector('.history-cont');

historyButton.addEventListener('click', () => {
    history.classList.toggle('history-active');
    historyButton.classList.toggle('history-button-active');
})

history.addEventListener('click', (e) => {
    let word;

    if (e.target.className === 'history-item') {
        word = e.target.children[0].textContent;

    } else if (e.target.className === 'previous-word') {
        word = e.target.textContent;

    } else {
        return;
    }

    getData(UI.language, word);
})