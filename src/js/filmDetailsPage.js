import getDetails from '../data/getDetails';
import detailsFilms from '../template/detailsPage.hbs';
import 'material-design-icons/iconfont/material-icons.css';
import refs from './refs';


const monitorButtonStatusText = () => {

    if(localStorage.getItem(filmsQueue.find(movie => movie.original_title === selectFilm.original_title)) === selectFilm.original_title) {
        buttonQueue.textContent = 'Delete from queue';
    } else {
        buttonQueue.textContent = 'Add to queue';
    };

    if(localStorage.getItem(filmsWatched.find(movie => movie.original_title === selectFilm.original_title)) === selectFilm.original_title) {
        buttonWatched.textContent = 'Delete from watched';
    } else {
        buttonWatched.textContent = 'Add to watched';
    };

};

const drawQueueFilmList = () => {
    const toQueueArray = [];
    const movie = localStorage.getItem(filmsQueue.find(movie => movie.original_title === selectFilm.original_title));

    if(localStorage.getItem(filmsQueue) && movie && (movie !== selectFilm.original_title)) {
        toQueueArray.push(movie);
    } else {
        if(toQueueArray.length === 0) return;
        const indexOfTheMovieToBeDeleted = toQueueArray.indexOf(movie);
        toQueueArray.splice(indexOfTheMovieToBeDeleted, 1);
    };

    localStorage.setItem(filmsQueue, toQueueArray);
    monitorButtonStatusText();
};

const drawWatchedFilmList = () => {
    const toWatchedArray = [];
    const movie = localStorage.getItem(filmsWatched.find(movie => movie.original_title === selectFilm.original_title));

    if(localStorage.getItem(filmsWatched) && movie && (movie !== selectFilm.original_title)) {
        toWatchedArray.push(movie);
    } else {
        if(toWatchedArray.length === 0) return;
        const indexOfTheMovieToBeDeleted = toWatchedArray.indexOf(movie);
        toWatchedArray.splice(indexOfTheMovieToBeDeleted, 1);
    };

    localStorage.setItem(filmsWatched, toWatchedArray);
    monitorButtonStatusText();
};

const showDetails = (selectFilm) => {
    const temp = detailsFilms(getDetails);
    refs.detailsPage.innerHTML = temp;

    const buttonWatched = document.querySelector('.details__button-watched');
    const buttonQueue = document.querySelector('.details__button-queue');
    
    monitorButtonStatusText();
};

export { showDetails, drawQueueFilmList, drawWatchedFilmList, buttonWatched, buttonQueue };