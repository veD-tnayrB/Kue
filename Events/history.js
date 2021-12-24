import { dataBaseConexion } from './conexion.js';

const historyButton = document.getElementById('history-button-cont');
const history = document.querySelector('.history-cont');

// Open and close the history
historyButton.addEventListener('click', e => {
    history.classList.toggle('history-active');
    historyButton.classList.toggle('history-button-active')
})

// Gets the items that were present in the main section by their class
const searchBar = document.getElementById('search-bar');

searchBar.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
        const currentCards = document.querySelectorAll('.word');
        const fragment = document.createDocumentFragment();

        currentCards.forEach(word => {
            const newItem = document.createElement('div');
            newItem.classList.add('history-item');
            
            const wordElement = document.createElement('span')
            wordElement.classList.add('previous-word')
            wordElement.textContent = word.textContent;


            newItem.appendChild(wordElement);
            fragment.appendChild(newItem);
        });
        history.appendChild(fragment);
    }
})


history.addEventListener('click', e => {
    let word;

    if (e.target.className === 'history-item') {
        word = e.target.children[0].textContent;

    } else if (e.target.className === 'previous-word') {
        word = e.target.textContent;

    } else {
        console.log('any word selected')
        return
    }

    dataBaseConexion(word)

})