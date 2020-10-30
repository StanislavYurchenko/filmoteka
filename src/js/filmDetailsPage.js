import getDetails from '../data/getDetails';
import detailsFilms from '../template/detailsPage.hbs';
import 'material-design-icons/iconfont/material-icons.css';
import refs from './refs';


const findMoveInArray = (array) => {
  return array.find(movie => movie.original_title === getDetails.original_title).original_title;
};


const monitorButtonStatusText = () => {
  const buttonWatched = document.querySelector('.details__button-watched');
  const buttonQueue = document.querySelector('.details__button-queue');

  buttonWatched.addEventListener('click', toggleToWatched);
  buttonQueue.addEventListener('click', toggleToQueue);


  const filmsQueueInLocalStorage = JSON.parse(localStorage.getItem('filmsQueue'));
  const filmsWatchedInLocalStorage = JSON.parse(localStorage.getItem('filmsWatched'));

  if (filmsQueueInLocalStorage && filmsQueueInLocalStorage.length && findMoveInArray(filmsQueueInLocalStorage) === getDetails.original_title) {
    buttonQueue.innerHTML = `<i class="material-icons details__icons">event_busy</i> Delete from queue`;
  } else {
    buttonQueue.innerHTML = `<i class="material-icons details__icons">event_busy</i> Add to queue`;
  }

  if (filmsWatchedInLocalStorage && filmsWatchedInLocalStorage.length && findMoveInArray(filmsWatchedInLocalStorage) === getDetails.original_title) {
    buttonWatched.innerHTML = `<i class="material-icons details__icons">videocam</i> Delete from watched`;
  } else {
    buttonWatched.innerHTML = `<i class="material-icons details__icons">videocam</i> Add to watched`;
  }
};


const toggleToQueue = () => {
  const toQueueArray = [];
  const moviesToQueueFromLocalStorage = JSON.parse(localStorage.getItem('filmsQueue'));


  if (moviesToQueueFromLocalStorage && moviesToQueueFromLocalStorage.length && findMoveInArray(moviesToQueueFromLocalStorage)) {
    toQueueArray.push(...moviesToQueueFromLocalStorage);
    const indexOfTheMovieToBeDeleted = toQueueArray.indexOf(getDetails);
    toQueueArray.splice(indexOfTheMovieToBeDeleted, 1);
  } else {
    toQueueArray.push(getDetails);
  }

  localStorage.setItem('filmsQueue', JSON.stringify(toQueueArray));
  monitorButtonStatusText();
};


const toggleToWatched = () => {
  const toWatchedArray = [];
  const moviesToWatchedFromLocalStorage = JSON.parse(localStorage.getItem('filmsWatched'));
  console.log(typeof localStorage
    .getItem('filmsWatched'));
  const movie = localStorage
    .getItem('filmsWatched')
    .find(movie => movie.original_title === selectFilm.original_title);


  if (moviesToWatchedFromLocalStorage && moviesToWatchedFromLocalStorage.length && findMoveInArray(moviesToWatchedFromLocalStorage)) {
    toWatchedArray.push(...moviesToWatchedFromLocalStorage);
    const indexOfTheMovieToBeDeleted = toWatchedArray.indexOf(getDetails);
    toWatchedArray.splice(indexOfTheMovieToBeDeleted, 1);
  } else {
    toWatchedArray.push(getDetails);
  }

  localStorage.setItem('filmsWatched', JSON.stringify(toWatchedArray));
  monitorButtonStatusText();
};

const showDetails = selectFilm => {
  getDetails.release_date = getDetails.release_date
    .split('')
    .splice(0, 4)
    .join('');
  const temp = detailsFilms(selectFilm);
  refs.detailsPage.innerHTML = temp;
  console.log();
  monitorButtonStatusText();
};


export { showDetails, toggleToQueue, toggleToWatched };