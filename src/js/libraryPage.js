import myFilmLibraryPage from '../template/myFilmLibraryPage.hbs';
import refs from './refs'

fetch('https://api.themoviedb.org/3/search/movie?api_key=81f248d3c9154788229a5419bb33091a&language=en-US&query=hello&page=1&include_adult=false').then(res => res.json()).then(movies => {
    const { results } = movies;
    console.log(results);
    console.log(movies);
    const markup = myFilmLibraryPage(results);
    refs.myFilmLibraryPage.insertAdjacentHTML('beforeend', markup);
}); 

// function createLibraryCardFunc(imgPath, filmTitle, movieId, voteAverage) {
//     const myLibrary=[],
//     const markup = myFilmLibraryPage([{}, {}, {}])
    
// }

function drawQueueFilmList() {
    let fragment;
    let readLocalStorage = localStorage.getItem('filmsQueue');
    const parsedLocalStorage = JSON.parse(readLocalStorage)
    if (!parsedLocalStorage) {
        alert('You do not have to queue movies to watch. Add them.')
    }

 };
function drawWatchedFilmList() { };

drawQueueFilmList();