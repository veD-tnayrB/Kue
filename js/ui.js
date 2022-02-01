export default class UI {

    static language = 'en';
    static mainSection = document.getElementById('main-section');
    static historySection = document.querySelector('.history-cont');


    static createCard(word, partOfSpeech, phonetic, audio, origin, definition, example) {
        const card = cardStructure(word, partOfSpeech, phonetic, audio, origin, definition, example);
        this.mainSection.innerHTML = card;

        this.addToHistory();
        this.playAudio();
    }

    static setLanguage() {
        const languageIndicator = document.getElementById('language-indicator');
        languageIndicator.classList.toggle('active');

        this.language = this.language === "en" ? "es" : "en";
    }

    static addToHistory() {
        const word = document.querySelector('.word').textContent;
        const element = savedWordStructure(word, this.language);

        this.historySection.innerHTML += element;
    }

    static playAudio() {
        const buttonsCont = document.querySelector('.audio-indicator');
        const playButton = document.querySelector('.play');

        playButton.addEventListener('click', () => {
            const audio = buttonsCont.previousElementSibling;

            buttonsCont.innerHTML = '<i class="fas fa-pause-circle audio-icon pause"></i>';
            audio.play();

            audio.addEventListener('ended', () => {

                buttonsCont.innerHTML = '<i class="fas fa-play-circle audio-icon play" title="Play"></i>';
                this.playAudio();
            })

        })

        
    }

    static setInformation(message, id) {
        const messageElement = infoStructure(message, id);

        this.mainSection.innerHTML = messageElement;
    }

}

/* Structures */

const cardStructure = (word, partOfSpeech, phonetic, audio, origin, definition, example) => {
    return (
        `<article class="word-cont">
                <div class="title-type-cont">
                    <h3 class="word">${word}</h3>
                    <span class="type">${partOfSpeech}</span>
                </div>
                <div class="phonetic-cont">
                    <span class="phonetic">${phonetic}</span>
                    <audio src=${audio} class="audio">
                        <i class="fas fa-volume-mute audio-icon none" alt="Your browser does not support the file" title="Your browser does not support the file"></i>
                    </audio>
                    <div class="audio-indicator">
                        ${audio !== undefined ? '<i class="fas fa-play-circle audio-icon play" title="Play"></i>' : '<i class="fas fa-volume-mute audio-icon none" alt="Audio file not found" title="Audio file not found"></i>'}
                    </div>
                </div>
                <div class="meaning-cont">
                    <span class="text-description" id="origin-label">${origin !== '' ? UI.language === 'en' ? 'Origin:' : 'Origen:' : ''}</span><p class="origin">${origin}</p>
                    <span class="text-description" id="meaning-label">${definition !== '' ? UI.language === 'en' ? 'Definition:' : "Definicion:" : ''}</span><p class="meaning">${definition}</p>
                    <span class="text-description" id="example-label">${example !== '' ? UI.language === 'en' ? 'Example:' : 'Ejemplo:' : ''}</span><p class="example">${example}</p>
                </div>
            </article>`
    )
}

const savedWordStructure = (word, language) => {
    return (
        `<article class="history-item">
            <span class="previous-word">${word}</span>
            <span class="previous-language">${language}</span>
        </article>
        `
    )
}

const infoStructure = (message, id) => {
    let src;

    switch (id) {
        case 1:
            src = 'NotFound';
            break;

        case 2:
            src = 'Loading';
            break;

        case 3:
            src = 'NotExists';
            break;
    }

    return (
        `<div class="message">
            <img src="assets/resources/${src}.svg" id=${src} />
            <span class="">${message}</span>
        </div>`
    )
}