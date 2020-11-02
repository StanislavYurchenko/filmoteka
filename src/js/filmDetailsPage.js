import detailsFilms from '../template/detailsPage.hbs';
import 'material-design-icons/iconfont/material-icons.css';
import refs from './refs';

let selectedFilm = null;

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


const showDetails = (selectFilm) => {

  const filterReliseDate = (selectFilm) => {
    (!selectFilm.release_date)
      ? selectFilm.release_date = 'unknown'
      : selectFilm.release_date = selectFilm.release_date.slice(0, 4);
    return selectFilm
  }

  const filterPosterPath = (selectFilm) => {
    const baseUrlPosterPath = "https://image.tmdb.org/t/p/original";
    const posterPath = selectFilm.poster_path;
    const noImagepath = `./images/temp.png`;
    if (typeof selectFilm.poster_path !== 'string') {
      selectFilm.poster_path = noImagepath
    } else {
      if (posterPath.includes(baseUrlPosterPath)) {
        selectFilm.poster_path = posterPath
        return selectFilm
      }
      if (posterPath.includes(noImagepath)) {
        selectFilm.poster_path = posterPath
        return selectFilm
      }
      selectFilm.poster_path = `${baseUrlPosterPath}${selectFilm.poster_path}`
    }
    return selectFilm
  }

  const filterBgdropPath = (selectFilm) => {
    const baseUrlBgdropPath = "https://image.tmdb.org/t/p/w500";
    const bgdropPath = selectFilm.backdrop_path;
    const noImagepath = `./images/temp.png`;
    if (typeof selectFilm.backdrop_path !== 'string') {
      selectFilm.backdrop_path = noImagepath
    } else {
      if (bgdropPath.includes(baseUrlBgdropPath)) {
        selectFilm.backdrop_path = bgdropPath
        return selectFilm
      }
      if (bgdropPath.includes(noImagepath)) {
        selectFilm.backdrop_path = bgdropPath
        return selectFilm
      }
      selectFilm.backdrop_path = `${baseUrlBgdropPath}${selectFilm.backdrop_path}`
    }
    return selectFilm
  }

  selectedFilm = filterBgdropPath(filterPosterPath(filterReliseDate(selectFilm)))
  refs.detailsPage.innerHTML = detailsFilms(selectedFilm);

  monitorButtonStatusText();
};

export { showDetails, toggleToQueue, toggleToWatched };

