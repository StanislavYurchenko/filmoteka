import detailsFilms from '../template/detailsPage.hbs';
import 'material-design-icons/iconfont/material-icons.css';
import refs from './refs';
import { selectedFilm } from './navigation';


const findMoveInArray = (array) => {
  const findMovie = array.find(movie => movie.id === selectedFilm.id);
  if (findMovie) return findMovie.id;
};


const monitorButtonStatusText = () => {
  const buttonWatched = document.querySelector('.details__button-watched');
  const buttonQueue = document.querySelector('.details__button-queue');

  buttonWatched.addEventListener('click', toggleToWatched);
  buttonQueue.addEventListener('click', toggleToQueue);


  const filmsQueueInLocalStorage = JSON.parse(localStorage.getItem('filmsQueue'));
  const filmsWatchedInLocalStorage = JSON.parse(localStorage.getItem('filmsWatched'));

  if (filmsQueueInLocalStorage && filmsQueueInLocalStorage.length && findMoveInArray(filmsQueueInLocalStorage) === selectedFilm.id) {
    buttonQueue.innerHTML = `<i class="material-icons details__icons">event_busy</i> Delete from queue`;
  } else {
    buttonQueue.innerHTML = `<i class="material-icons details__icons">event_busy</i> Add to queue`;
  };

  if (filmsWatchedInLocalStorage && filmsWatchedInLocalStorage.length && findMoveInArray(filmsWatchedInLocalStorage) === selectedFilm.id) {
    buttonWatched.innerHTML = `<i class="material-icons details__icons">videocam</i> Delete from watched`;
  } else {
    buttonWatched.innerHTML = `<i class="material-icons details__icons">videocam</i> Add to watched`;
  };
};


const toggleToQueue = () => {
  let toQueueArray = [];
  const moviesToQueueFromLocalStorage = JSON.parse(localStorage.getItem('filmsQueue'));

  if (moviesToQueueFromLocalStorage) toQueueArray.push(...moviesToQueueFromLocalStorage);

  if (moviesToQueueFromLocalStorage && moviesToQueueFromLocalStorage.length && findMoveInArray(moviesToQueueFromLocalStorage)) {
    toQueueArray = toQueueArray.filter(el => el.id !== selectedFilm.id);

  } else {
    toQueueArray.push(selectedFilm);
  };

  localStorage.setItem('filmsQueue', JSON.stringify(toQueueArray));
  monitorButtonStatusText();
};


const toggleToWatched = () => {
  let toWatchedArray = [];
  const moviesToWatchedFromLocalStorage = JSON.parse(localStorage.getItem('filmsWatched'));

  if (moviesToWatchedFromLocalStorage) toWatchedArray.push(...moviesToWatchedFromLocalStorage);

  if (moviesToWatchedFromLocalStorage && moviesToWatchedFromLocalStorage.length && findMoveInArray(moviesToWatchedFromLocalStorage)) {
    toWatchedArray = toWatchedArray.filter(el => el.id !== selectedFilm.id);
  } else {
    toWatchedArray.push(selectedFilm);
  };

  localStorage.setItem('filmsWatched', JSON.stringify(toWatchedArray));
  monitorButtonStatusText();
};


const showDetails = selectFilm => {
<<<<<<< HEAD
  (typeof selectFilm.release_date === 'undefined' || selectFilm.release_date === "" || selectFilm.release_date.length < 4)
    ? selectFilm.release_date = 'unknown'
    : selectFilm.release_date = selectFilm.release_date.slice(0, 4);

=======
  if(selectFilm.release_date) {
    selectFilm.release_date = selectedFilm.release_date.split('').splice(0, 4).join('');
  }
  
>>>>>>> dev
  const temp = detailsFilms(selectFilm);
  refs.detailsPage.innerHTML = temp;

  monitorButtonStatusText();
};


export { showDetails, toggleToQueue, toggleToWatched };

