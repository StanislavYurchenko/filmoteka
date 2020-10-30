import myFilmLibraryPage from '../template/myFilmLibraryPage.hbs';
import { formattingFethData } from './initialHomePage';
import { activeDetailsPage } from './navigation';
import refs from './refs';
import { notice } from './pnotify';

fetch(
  'https://api.themoviedb.org/3/search/movie?api_key=81f248d3c9154788229a5419bb33091a&language=en-US&query=bad&page=1&include_adult=false',
)
  .then(res => res.json())
  .then(movies => {
    const { results } = movies;
    localStorage.setItem('filmsWatched', JSON.stringify(results));
  });

fetch(
  'https://api.themoviedb.org/3/search/movie?api_key=81f248d3c9154788229a5419bb33091a&language=en-US&query=bad&page=2&include_adult=false',
)
  .then(res => res.json())
  .then(movies => {
    const { results } = movies;
    localStorage.setItem('filmsQueue', JSON.stringify(results));
  });

function renderLibraryButtons(template) {
  refs.myFilmLibraryPage.insertAdjacentHTML('afterbegin', template());
}

function serviceLibraryButtons(template) {
  renderLibraryButtons(template);
  refs.watchedBtn = document.querySelector('.watched');
  refs.queueBtn = document.querySelector('.queue');
  refs.watchedBtn.addEventListener('click', drawWatchedFilmList);
  refs.queueBtn.addEventListener('click', drawQueueFilmList);
}

function createLibraryCardFunc(parsedLocalStorage, message) {
  if (!parsedLocalStorage) {
    notice(message);
    return;
  }
  refs.libraryList.innerHTML = '';
  const formatData = formattingFethData(parsedLocalStorage);
  const fragment = myFilmLibraryPage(formatData);
  refs.libraryList.insertAdjacentHTML('beforeend', fragment);

  refs.libraryList.removeEventListener('click', onClickFilmAtMyLibrary);
  refs.libraryList.addEventListener('click', onClickFilmAtMyLibrary);
}

function onClickFilmAtMyLibrary(e) {
  if (e.target.nodeName !== 'LI') {
    return;
  }

  refs.queueBtn.classList.contains('library-btn--active')
    ? renderDetailPageFromLibrary('filmsQueue')
    : renderDetailPageFromLibrary('filmsWatched');

  function renderDetailPageFromLibrary(query) {
    const arr = JSON.parse(localStorage.getItem(query));
    let detailFilm = arr.find(
      filmData => filmData.id === Number(e.target.dataset.itemid),
    );
    activeDetailsPage(detailFilm);
  }
}

function drawQueueFilmList() {
  refs.watchedBtn.classList.remove('library-btn--active');
  refs.queueBtn.classList.add('library-btn--active');

  const message = 'You do not have to queue movies to watch. Add them.';
  let readLocalStorage = localStorage.getItem('filmsQueue');
  const parsedLocalStorage = JSON.parse(readLocalStorage);

  createLibraryCardFunc(parsedLocalStorage, message);
}

function drawWatchedFilmList() {
  refs.queueBtn.classList.remove('library-btn--active');
  refs.watchedBtn.classList.add('library-btn--active');

  const message = 'You do not have watched movies. Add them';
  let readLocalStorage = localStorage.getItem('filmsWatched');
  const parsedLocalStorage = JSON.parse(readLocalStorage);

  createLibraryCardFunc(parsedLocalStorage, message);
}

export { drawQueueFilmList, drawWatchedFilmList, serviceLibraryButtons };
