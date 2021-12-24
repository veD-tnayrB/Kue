const mainSection = document.getElementById('main-section');

// Plays the audio of the word
mainSection.addEventListener('click', e => {

    if (e.target.classList.value === 'fas fa-play-circle audio-icon play') {
        let audio = e.target.previousElementSibling;
        let audioButton = e.target;
        let theOtherButton = e.target.nextElementSibling; // lmao

        audio.play()
        audioButton.style.display = 'none';
        theOtherButton.style.display = 'initial';

        audio.addEventListener('ended', () => {
            audioButton.style.display = 'initial';
            theOtherButton.style.display = 'none';
        })
    }
});