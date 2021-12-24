import { dataBaseConexion } from "./conexion.js";

const searchBar = document.getElementById('search-bar');

// Searches the API for the specified word (searchBar.value)
searchBar.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
        let value = searchBar.value;

        if (value !== '') {
            dataBaseConexion(value);
        
        } else {
            // Set default words depending on the language
            if (language === 'en') {
                dataBaseConexion('word');
        
            } else {
                dataBaseConexion('palabra');
        
            }
        }
    }
});
