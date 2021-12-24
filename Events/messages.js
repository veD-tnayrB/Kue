import { removeMainSectionElements } from './cardMaker.js';
const mainSection = document.getElementById('main-section');


export default function showMessage(message, svgId) {
    // Deletes existing items in the main section so that they do not accumulate with messages
    removeMainSectionElements();

    const messageCont = document.createElement('div');

    const text = document.createElement('span');
    text.textContent = message;

    const image = document.createElement('img');
    messageCont.append(image, text);

    switch (svgId) {
        case '1':
            image.setAttribute('src', './Resources/NotExists.svg');
            break;

        case '2':
            image.setAttribute('src', './Resources/NotFound.svg');
            break;

        case '3':
            image.setAttribute('src', './Resources/Loading.svg');
            image.id = 'loading-image';
            break;
    }
    
    messageCont.classList.add('message');
    mainSection.appendChild(messageCont);
}