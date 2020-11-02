import myLibraryFilmListTemplate from '../template/myFilmLibraryPage.hbs';
import { formattingFetchData } from './initialHomePage';
import { activeDetailsPage} from './navigation';
import refs from './refs';
import { notice } from './pnotify';

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

function createLibraryCardFunc(localeStorageRequest, message) {
  refs.libraryList.innerHTML = '';

  const readLocalStorage = JSON.parse(localStorage.getItem(localeStorageRequest));
  if (!readLocalStorage || !readLocalStorage.length) {
    notice(message);
    return;
  }
  const formatData = formattingFetchData(readLocalStorage);
  const renderLibraryList = myLibraryFilmListTemplate(formatData);
  refs.libraryList.insertAdjacentHTML('beforeend', renderLibraryList);

  refs.libraryList.removeEventListener('click', onClickFilmAtMyLibrary);
  refs.libraryList.addEventListener('click', onClickFilmAtMyLibrary);
}

function onClickFilmAtMyLibrary(e) {
  if (e.target.nodeName !== 'LI') {
    return;
  }
  refs.queueBtn.classList.contains('library-btn--active')
    ? renderDetailPageFromLibrary('filmsQueue', e)
    : renderDetailPageFromLibrary('filmsWatched', e);
}

function renderDetailPageFromLibrary(query, e) {
  const getLocalStorage = JSON.parse(localStorage.getItem(query));
  const detailFilm = getLocalStorage.find(
    filmData => filmData.id === Number(e.target.dataset.itemid),
  );
  activeDetailsPage(detailFilm);
}

function drawQueueFilmList() {
  doNotActiveButton(refs.watchedBtn);
  doActiveButton(refs.queueBtn);
  const localeStorageRequest = 'filmsQueue';
  const message = 'You do not have to queue movies to watch. Add them.';

  createLibraryCardFunc(localeStorageRequest, message);
}

function drawWatchedFilmList() {
  doNotActiveButton(refs.queueBtn);
  doActiveButton(refs.watchedBtn);
  const localeStorageRequest = 'filmsWatched';
  const message = 'You do not have watched movies. Add them';

  createLibraryCardFunc(localeStorageRequest, message);
}

function doActiveButton(button) {
  button.classList.add('library-btn--active');
}

function doNotActiveButton(button) {
  button.classList.remove('library-btn--active');
}

export { drawQueueFilmList, drawWatchedFilmList, serviceLibraryButtons };

