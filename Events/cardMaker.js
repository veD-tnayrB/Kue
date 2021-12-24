const templateWord = document.getElementById('template-word').content;
const mainSection = document.getElementById('main-section');

// Detects if there are items in the main section and deletes them
function removeMainSectionElements() {
    const existingElements = document.querySelectorAll('#main-section *');

    if (existingElements.length > 0) {
        existingElements.forEach(word => word.remove());

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
        const pauseButton = templateWord.querySelector('.pause');
        const none = templateWord.querySelector('.none');

        // Detects if audio is available and displays the button in almost being true
        element.phonetics.forEach(element => {
            if (element.audio !== undefined) {
                audio.setAttribute('src', element.audio);
                playButton.style.display = 'initial';

            } else {
                playButton.style.display = 'none';
            }
        })

        const origin = templateWord.querySelector('.origin');
        origin.textContent = element.origin;

        const meaningElement = templateWord.querySelector('.meaning');
        const exampleElement = templateWord.querySelector('.example');
        const typeElement = templateWord.querySelector('.type');

        element.meanings.forEach(meaning => {
            typeElement.textContent = meaning.partOfSpeech;

            meaning.definitions.forEach(def => {
                meaningElement.textContent = def.definition;
                exampleElement.textContent = def.example;
            })
    });

        // Show it in the main section
        const newTemplateWord = templateWord.cloneNode(true);
        mainSection.appendChild(newTemplateWord);
    });
    
}

export { create, removeMainSectionElements }