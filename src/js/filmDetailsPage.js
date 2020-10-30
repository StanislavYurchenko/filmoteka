import getDetails from '../data/getDetails';
import detailsFilms from '../template/detailsPage.hbs';
import 'material-design-icons/iconfont/material-icons.css';
import refs from './refs';

const monitorButtonStatusText = () => {
<<<<<<< HEAD
// const filmsQueueInLocalStorage = JSON.parse(localStorage.getItem('filmsQueue')).find(movie => movie.original_title === selectFilm.original_title);
// const filmsWatchedInLocalStorage = JSON.parse(localStorage.getItem('filmsWatched')).find(movie => movie.original_title === selectFilm.original_title);

const buttonWatched = document.querySelector('.details__button-watched');
const buttonQueue = document.querySelector('.details__button-queue');


const filmsQueueInLocalStorage = JSON.parse(localStorage.getItem('filmsQueue')).find(movie => movie.original_title === getDetails.original_title);
const filmsWatchedInLocalStorage = JSON.parse(localStorage.getItem('filmsWatched')).find(movie => movie.original_title === getDetails.original_title);

<<<<<<< HEAD
<<<<<<< HEAD
//     if(localStorage.getItem(filmsQueue.find(movie => movie.original_title === selectFilm.original_title)) === selectFilm.original_title) {
//         buttonQueue.textContent = 'Delete from queue';
//     } else {
//         buttonQueue.textContent = 'Add to queue';
//     };

//     if(localStorage.getItem(filmsWatched.find(movie => movie.original_title === selectFilm.original_title)) === selectFilm.original_title) {
//         buttonWatched.textContent = 'Delete from watched';
//     } else {
//         buttonWatched.textContent = 'Add to watched';
//     };
=======
    // if(localStorage.getItem(filmsQueue.find(movie => movie.original_title === selectFilm.original_title)) === selectFilm.original_title) {
    //     buttonQueue.textContent = 'Delete from queue';
    // } else {
    //     buttonQueue.textContent = 'Add to queue';
    // };

    // if(localStorage.getItem(filmsWatched.find(movie => movie.original_title === selectFilm.original_title)) === selectFilm.original_title) {
    //     buttonWatched.textContent = 'Delete from watched';
    // } else {
    //     buttonWatched.textContent = 'Add to watched';
    // };
>>>>>>> 4515e48c3a294c3ab7111ec0b7b5133e9228e6da
=======
    if(filmsQueueInLocalStorage === getDetails.original_title) {
        buttonQueue.innerHTML = `<i class="material-icons details__icons">event_busy</i> Delete from queue`;
    } else {
        buttonQueue.innerHTML = `<i class="material-icons details__icons">event_busy</i> Add to queue`;
    };

    if(filmsWatchedInLocalStorage === getDetails.original_title) {
        buttonWatched.innerHTML = `<i class="material-icons details__icons">videocam</i> Delete from watched`;
    } else {
        buttonWatched.innerHTML = `<i class="material-icons details__icons">videocam</i> Add to watched`;
    };
>>>>>>> 4d26b1f393bfe4e76caf0f21ed90671b707da79d

=======
  // const filmsQueueInLocalStorage = JSON.parse(localStorage.getItem('filmsQueue')).find(movie => movie.original_title === selectFilm.original_title);
  // const filmsWatchedInLocalStorage = JSON.parse(localStorage.getItem('filmsWatched')).find(movie => movie.original_title === selectFilm.original_title);

  const buttonWatched = document.querySelector('.details__button-watched');
  const buttonQueue = document.querySelector('.details__button-queue');

  const filmsQueueInLocalStorage = JSON.parse(
    localStorage.getItem('filmsQueue'),
  ).find(movie => movie.original_title === getDetails.original_title);
  const filmsWatchedInLocalStorage = JSON.parse(
    localStorage.getItem('filmsWatched'),
  ).find(movie => movie.original_title === getDetails.original_title);

  if (filmsQueueInLocalStorage === getDetails.original_title) {
    buttonQueue.innerHTML = `<i class="material-icons details__icons">event_busy</i> Delete from queue`;
  } else {
    buttonQueue.innerHTML = `<i class="material-icons details__icons">event_busy</i> Add to queue`;
  }

  if (filmsWatchedInLocalStorage === getDetails.original_title) {
    buttonWatched.innerHTML = `<i class="material-icons details__icons">videocam</i> Delete from watched`;
  } else {
    buttonWatched.innerHTML = `<i class="material-icons details__icons">videocam</i> Add to watched`;
  }
>>>>>>> f34389e0ba382967c900f9d71e8f2644f75df8f7
};

const toggleToQueue = () => {
  const toQueueArray = [];
  const moviesToQueueFromLocalStorage = JSON.parse(localStorage.getItem('filmsQueue'));
  const movie = localStorage
    .getItem('filmsQueue')
    .find(movie => movie.original_title === selectFilm.original_title);

  if (moviesToQueueFromLocalStorage) {
    toWatchedArray.push(...moviesToQueueFromLocalStorage);
  }

  if (moviesToQueueFromLocalStorage && !movie) {
    toQueueArray.push(selectFilm);
  } else {
    if (toQueueArray.length === 0) return;
    const indexOfTheMovieToBeDeleted = toQueueArray.indexOf(movie);
    toQueueArray.splice(indexOfTheMovieToBeDeleted, 1);
  }

  localStorage.setItem('filmsQueue', JSON.stringify(toQueueArray));
  monitorButtonStatusText();
};

const toggleToWatched = () => {
  const toWatchedArray = [];
  const moviesToWatchedFromLocalStorage = JSON.parse(localStorage.getItem('filmsWatched'));
  const movie = localStorage
    .getItem('filmsWatched')
    .find(movie => movie.original_title === selectFilm.original_title);

  if (moviesToWatchedFromLocalStorage) {
    toWatchedArray.push(...moviesToWatchedFromLocalStorage);
  }

  if (moviesToWatchedFromLocalStorage && !movie) {
    toWatchedArray.push(selectFilm);
  } else {
    if (toWatchedArray.length === 0) return;
    const indexOfTheMovieToBeDeleted = toWatchedArray.indexOf(movie);
    toWatchedArray.splice(indexOfTheMovieToBeDeleted, 1);
  }

  localStorage.setItem('filmsWatched', JSON.stringify(toWatchedArray));
  monitorButtonStatusText();
};

const showDetails = selectFilm => {
  getDetails.release_date = getDetails.release_date
    .split('')
    .splice(0, 4)
    .join('');
  const temp = detailsFilms(getDetails);
  refs.detailsPage.innerHTML = temp;
  monitorButtonStatusText();
};

<<<<<<< HEAD
<<<<<<< HEAD
export default { showDetails, drawQueueFilmList, drawWatchedFilmList };
console.log(showDetails());
=======
export { showDetails, drawQueueFilmList, drawWatchedFilmList };
>>>>>>> 4515e48c3a294c3ab7111ec0b7b5133e9228e6da
=======
export { showDetails, toggleToQueue, toggleToWatched };
>>>>>>> f34389e0ba382967c900f9d71e8f2644f75df8f7
