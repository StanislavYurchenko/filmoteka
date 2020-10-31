import myFilmLibraryPageTemplate from '../template/myFilmLibraryPage.hbs';
import { formattingFethData } from './initialHomePage';
import { activeDetailsPage } from './navigation';
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

function createLibraryCardFunc(parsedLocalStorage, message) {
  if (!parsedLocalStorage || !parsedLocalStorage.length) {
    notice(message);
    return;
  }
  // refs.libraryList.innerHTML = '';
  const formatData = formattingFethData(parsedLocalStorage);
  const renderLibraryList = myFilmLibraryPageTemplate(formatData);
  refs.libraryList.insertAdjacentHTML('beforeend', renderLibraryList);

  refs.libraryList.removeEventListener('click', onClickFilmAtMyLibrary);
  refs.libraryList.addEventListener('click', onClickFilmAtMyLibrary);

  function onClickFilmAtMyLibrary(e) {
    console.log(e.target.dataset.itemid);
    if (e.target.nodeName !== 'LI') {
      return;
    }

    refs.queueBtn.classList.contains('library-btn--active')
      ? renderDetailPageFromLibrary('filmsQueue')
      : renderDetailPageFromLibrary('filmsWatched');

    // if (refs.queueBtn.classList.contains('library-btn--active')) {
    //   renderDetailPageFromLibrary('filmsQueue');
    // } else {
    //   renderDetailPageFromLibrary('filmsWatched');
    // }

    function renderDetailPageFromLibrary(query) {
      const arr = JSON.parse(localStorage.getItem(query));
      let detailFilm = arr.find(
        filmData => filmData.id === Number(e.target.dataset.itemid),
      );
      activeDetailsPage(detailFilm);
    }
  }
}

function drawQueueFilmList() {
  refs.watchedBtn.classList.remove('library-btn--active');
  refs.queueBtn.classList.add('library-btn--active');
  refs.libraryList.innerHTML = '';
  const message = 'You do not have to queue movies to watch. Add them.';
  let readLocalStorage = localStorage.getItem('filmsQueue');
  const parsedLocalStorage = JSON.parse(readLocalStorage);

  createLibraryCardFunc(parsedLocalStorage, message);
}

function drawWatchedFilmList() {
  refs.queueBtn.classList.remove('library-btn--active');
  refs.watchedBtn.classList.add('library-btn--active');
  refs.libraryList.innerHTML = '';
  const message = 'You do not have watched movies. Add them';
  let readLocalStorage = localStorage.getItem('filmsWatched');
  const parsedLocalStorage = JSON.parse(readLocalStorage);

  createLibraryCardFunc(parsedLocalStorage, message);
}

export { drawQueueFilmList, drawWatchedFilmList, serviceLibraryButtons };
