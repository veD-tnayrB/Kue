import { addToHistory } from "./history.js";
import { language } from "./languageSelector.js";


const templateWord = document.getElementById('template-word').content;
const mainSection = document.getElementById('main-section');

// Detects if there are items in the main section and deletes them
function removeMainSectionElements() {
    const existingElements = document.querySelectorAll('#main-section *');

    if (existingElements.length > 0) {
        existingElements.forEach(word => word.remove());

    }
};

// Detects the language and based on that sets the language of the labels
function setLabel(label, labelInEsp, labelInEng, text, path) {
    if (text !== undefined) {
        const labelElement = templateWord.querySelector(label);

        if (language === 'en') {
            labelElement.textContent = labelInEng;

        } else {
            labelElement.textContent = labelInEsp;
        }
        path.textContent = text;
    }
}

// Collects the information that will be displayed and saves them in their respective tags
function create(data) {
    removeMainSectionElements()

    // starts storing the values in your tags
    data.forEach(element => {
        const word = templateWord.querySelector('.word');
        word.textContent = element.word;

        const phonetic = templateWord.querySelector('.phonetic');
        phonetic.textContent = element.phonetic;

        
        const audio = templateWord.querySelector('.audio');
        const playButton = templateWord.querySelector('.play');
        
        // Detects if audio is available and displays the button in almost being true
        audio.setAttribute('src', '');
        playButton.style.display = 'none';
        
        if (element.phonetics.length > 0) {
            element.phonetics.forEach(item => {
                if (item.hasOwnProperty('audio') && item.audio !== undefined) {
                    audio.setAttribute('src', item.audio);
                    playButton.style.display = 'initial';
                }
            });

        }
        

        const originInfo = templateWord.querySelector('.origin');
        setLabel('#origin-label', 'Origen:', 'Origin:', element.origin, originInfo);
        

        const meaningElement = templateWord.querySelector('.meaning');
        const exampleElement = templateWord.querySelector('.example');
        const typeElement = templateWord.querySelector('.type');

        element.meanings.forEach(meaning => {
            typeElement.textContent = meaning.partOfSpeech;

            meaning.definitions.forEach(def => {
                setLabel('#meaning-label', 'Definicion:', 'Meaning:', def.definition, meaningElement);
                setLabel('#example-label', 'Ejemplo:', 'Example:', def.example, exampleElement);

            })
    });

        // Show it in the main section
        const newTemplateWord = templateWord.cloneNode(true);
        mainSection.appendChild(newTemplateWord);

        addToHistory();
    });
    
}

export { create, removeMainSectionElements }