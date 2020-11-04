import detailsFilms from '../template/detailsPage.hbs';
import 'material-design-icons/iconfont/material-icons.css';
import refs from './refs';
import { Movies } from './authorizationAndMoviesDatabase';
import { error } from './pnotify';


let selectedFilm = null;
let allToQueue = []; 
let allToWatched = [];
let arrayMoviesToQueue = [];
let arrayMoviesToWatched = [];


const findMoveInArray = (array) => {
  const findMovie = array.find(movie => movie.id === selectedFilm.id);
  if (findMovie) return findMovie.id;
};


const monitorButtonStatusText = async () => {
  const buttonWatched = document.querySelector('.details__button-watched');
  const buttonQueue = document.querySelector('.details__button-queue');

  buttonWatched.addEventListener('click', toggleToWatched);
  buttonQueue.addEventListener('click', toggleToQueue);

  await Movies.getAllToWatchedMovies().then(movie => {
    allToWatched = movie || [];
  });

  await Movies.getAllToQueueMovies().then(movie => {
    allToQueue = movie || [];
  });

  if (allToQueue.length && findMoveInArray(allToQueue) === selectedFilm.id) {
    buttonQueue.innerHTML = `<i class="material-icons details__icons">event_busy</i> Delete from queue`;
  } else {
    if(!arrayMoviesToQueue && arrayMoviesToQueue !== null) {
      buttonQueue.innerHTML = `<i class="material-icons details__icons" disable>event_busy</i> Add to queue`;
      new error({
        title: 'You cannot add a movie!',
        text: 'Please register or log in!',
        delay: 1500, 
    });
    }
    buttonQueue.innerHTML = `<i class="material-icons details__icons">event_busy</i> Add to queue`;
  };

  if (allToWatched.length && findMoveInArray(allToWatched) === selectedFilm.id) {
    buttonWatched.innerHTML = `<i class="material-icons details__icons">videocam</i> Delete from watched`;

  } else {
    if(!arrayMoviesToWatched && arrayMoviesToWatched !== null) {
      buttonWatched.innerHTML = `<i class="material-icons details__icons" disable>videocam</i> Add to watched`;
      new error({
        title: 'You cannot add a movie!',
        text: 'Please register or log in!',
        delay: 1500, 
    });
    }
    buttonWatched.innerHTML = `<i class="material-icons details__icons">videocam</i> Add to watched`;
  };
};


const toggleToQueue = async () => {

  if (allToQueue.length && findMoveInArray(allToQueue)) {
    allToQueue = allToQueue.filter(el => el.id !== selectedFilm.id);
    arrayMoviesToQueue = await Movies.addAndDeleteToQueue(allToQueue);

  } else {
    allToQueue.push(selectedFilm);
    arrayMoviesToQueue = await Movies.addAndDeleteToQueue(allToQueue);
  };

  monitorButtonStatusText();
};


const toggleToWatched = async () => {

  if (allToWatched.length && findMoveInArray(allToWatched)) {
    allToWatched = allToWatched.filter(el => el.id !== selectedFilm.id);
    arrayMoviesToWatched = await Movies.addAndDeleteToWatched(allToWatched);
  } else {
    allToWatched.push(selectedFilm);
    arrayMoviesToWatched = await Movies.addAndDeleteToWatched(allToWatched);
  };

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

