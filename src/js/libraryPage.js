import myLibraryFilmListTemplate from '../template/myFilmLibraryPage.hbs';
import { activeDetailsPage } from './navigation';
import refs from './refs';
import { notice } from './pnotify';
import { Movies } from './authorizationAndMoviesDatabase';
let filmsList;

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

function createLibraryCardFunc(filmsList, message) {
  refs.libraryList.innerHTML = '';

  if (!filmsList || !filmsList.length) {
    notice(message);
    return;
  }
  const renderLibraryList = myLibraryFilmListTemplate(filmsList);
  refs.libraryList.insertAdjacentHTML('beforeend', renderLibraryList);
  refs.libraryList.removeEventListener('click', onClickFilmAtMyLibrary);
  refs.libraryList.addEventListener('click', onClickFilmAtMyLibrary);



}
function onClickFilmAtMyLibrary(e) {
  if (e.target.nodeName !== 'LI') {
    return;
  }
  renderDetailPage(filmsList, e);
}

function renderDetailPage(filmsList, e) {
  const detailFilm = filmsList.find(
    filmData => filmData.id === Number(e.target.dataset.itemid),
  );
  activeDetailsPage(detailFilm);
}

async function drawQueueFilmList() {
  doNotActiveButton(refs.watchedBtn);
  doActiveButton(refs.queueBtn);
  const message = 'You do not have to queue movies to watch. Add them.';
  await Movies.getAllToQueueMovies().then(films => filmsList = films)
  createLibraryCardFunc(filmsList, message);
}

async function drawWatchedFilmList() {
  doNotActiveButton(refs.queueBtn);
  doActiveButton(refs.watchedBtn);
  const message = 'You do not have watched movies. Add them';
  await Movies.getAllToWatchedMovies().then(films => filmsList = films)
  createLibraryCardFunc(filmsList, message);
}

function doActiveButton(button) {
  button.classList.add('library-btn--active');
}

function doNotActiveButton(button) {
  button.classList.remove('library-btn--active');
}

export { drawQueueFilmList, drawWatchedFilmList, serviceLibraryButtons };

