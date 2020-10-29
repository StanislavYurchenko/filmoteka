import myFilmLibraryPage from '../template/myFilmLibraryPage.hbs';
import refs from './refs';
import { notice } from './pnotify';

fetch(
  'https://api.themoviedb.org/3/search/movie?api_key=81f248d3c9154788229a5419bb33091a&language=en-US&query=bad&page=1&include_adult=false',
)
  .then(res => res.json())
  .then(movies => {
    const { results } = movies;
    localStorage.setItem('filmsQueue', JSON.stringify(results));
    localStorage.setItem('filmsWatched', JSON.stringify(results));
  });

function createLibraryCardFunc(parsedLocalStorage, message) {
  if (!parsedLocalStorage) {
    notice(message);
    return;
  }
  const fragment = myFilmLibraryPage(parsedLocalStorage);
  refs.libraryList.innerHTML = '';
  refs.libraryList.insertAdjacentHTML('beforeend', fragment);
}

function drawQueueFilmList() {
  const message = 'You do not have to queue movies to watch. Add them.';
  let readLocalStorage = localStorage.getItem('filmsQueue');
  const parsedLocalStorage = JSON.parse(readLocalStorage);

  createLibraryCardFunc(parsedLocalStorage, message);
}

function drawWatchedFilmList() {
  const message = 'You do not have watched movies. Add them';
  let readLocalStorage = localStorage.getItem('filmsWatched');
  const parsedLocalStorage = JSON.parse(readLocalStorage);

  createLibraryCardFunc(parsedLocalStorage, message);
}

export { drawQueueFilmList, drawWatchedFilmList };
drawQueueFilmList();
// drawWatchedFilmList();
