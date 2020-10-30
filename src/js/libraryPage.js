import myFilmLibraryPage from '../template/myFilmLibraryPage.hbs';
import myFilmLibraryPageButtons from '../template/myFilmLibraryPageButtons.hbs';
// import activeDetailsPage from './filmDetailsPage'
import refs from './refs';
import { notice } from './pnotify';

const watchedBtn = document.querySelector('.watched');
const queueBtn = document.querySelector('.queue');

watchedBtn.addEventListener('click', drawWatchedFilmList);
queueBtn.addEventListener('click', drawQueueFilmList);

// fetch(
//   'https://api.themoviedb.org/3/search/movie?api_key=81f248d3c9154788229a5419bb33091a&language=en-US&query=bad&page=1&include_adult=false',
// )
//   .then(res => res.json())
//   .then(movies => {
//     const { results } = movies;
//     localStorage.setItem('filmsWatched', JSON.stringify(results));
//     // localStorage.setItem('filmsQueue', JSON.stringify(results));
//   });

// fetch(
//   'https://api.themoviedb.org/3/search/movie?api_key=81f248d3c9154788229a5419bb33091a&language=en-US&query=bad&page=2&include_adult=false',
// )
//   .then(res => res.json())
//   .then(movies => {
//   const { results } = movies;
//   // localStorage.setItem('filmsWatched', JSON.stringify(results));
//   localStorage.setItem('filmsQueue', JSON.stringify(results));
// });

function createLibraryCardFunc(parsedLocalStorage, message) {
  if (!parsedLocalStorage) {
    notice(message);
    return;
  }
  refs.libraryList.innerHTML = '';
  const fragment = myFilmLibraryPage(parsedLocalStorage);
  //  refs.myFilmLibraryPage.insertAdjacentHTML(
  //     'afterbegin',
  //     myFilmLibraryPageButtons(),
  //   );
  refs.libraryList.insertAdjacentHTML('beforeend', fragment);

  refs.libraryList.addEventListener('click', e => {
    if (!e.target.nodeName === 'IMG') {
      return;
    }
    // activeDetailsPage();
    console.log(e.target.nodeName);
  });
}

function drawQueueFilmList() {
  watchedBtn.classList.remove('library-btn--active');
  queueBtn.classList.add('library-btn--active');

  const message = 'You do not have to queue movies to watch. Add them.';
  let readLocalStorage = localStorage.getItem('filmsQueue');
  const parsedLocalStorage = JSON.parse(readLocalStorage);

  createLibraryCardFunc(parsedLocalStorage, message);
}

function drawWatchedFilmList() {
  queueBtn.classList.remove('library-btn--active');
  watchedBtn.classList.add('library-btn--active');

  const message = 'You do not have watched movies. Add them';
  let readLocalStorage = localStorage.getItem('filmsWatched');
  const parsedLocalStorage = JSON.parse(readLocalStorage);

  createLibraryCardFunc(parsedLocalStorage, message);
}

export { drawQueueFilmList, drawWatchedFilmList };
