import showMessage from './messages.js';
import { create } from './cardMaker.js';
import { language } from './languageSelector.js'

// Get all data from API
async function dataBaseConexion(word) {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/${language}/${word}`);
    
    if (response.status >= 200 && response.status < 400) {
        const datas = await response.json();
        showMessage(`With what ${word} hmmm...`, '3');

        create(datas);
        

    } else if (response.status >= 400 && response.status < 500) {
        showMessage('We can\'t find the word you entered 😔, make sure the language is correct', '1');

    } else if (response.status >= 500) {
        showMessage('Apparently we are having server problems 🤡!', '2');

    }
}

export { dataBaseConexion }