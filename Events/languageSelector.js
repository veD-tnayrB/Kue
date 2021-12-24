// Current language
let language = 'en';
const languageSelector = document.getElementById('language-selector');
const languageIndicator = document.getElementById('language-indicator');

// Change the language of the search based on the position of the button
languageSelector.addEventListener('click', e => {
    languageIndicator.classList.toggle('active');
    
    if (language === 'en') {
        language = 'es';

    } else {
        language = 'en';

    }
})

export { language }