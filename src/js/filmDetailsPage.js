import getDetails from '../data/getDetails';
import detailsFilms from '../template/detailsPage.hbs';
import 'material-design-icons/iconfont/material-icons.css';
import refs from './refs';


const monitorButtonStatusText = () => {
// const filmsQueueInLocalStorage = JSON.parse(localStorage.getItem('filmsQueue')).find(movie => movie.original_title === selectFilm.original_title);
// const filmsWatchedInLocalStorage = JSON.parse(localStorage.getItem('filmsWatched')).find(movie => movie.original_title === selectFilm.original_title);

const buttonWatched = document.querySelector('.details__button-watched');
const buttonQueue = document.querySelector('.details__button-queue');


<<<<<<< HEAD
const filmsQueueInLocalStorage = JSON.parse(localStorage.getItem('filmsQueue')).find(movie => movie.original_title === getDetails.original_title);
const filmsWatchedInLocalStorage = JSON.parse(localStorage.getItem('filmsWatched')).find(movie => movie.original_title === getDetails.original_title);

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
=======
// const monitorButtonStatusText = () => {

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
>>>>>>> dev

// };

const drawQueueFilmList = () => {
    const toQueueArray = [];
    const localStorage = JSON.parse(localStorage.getItem('filmsQueue'));
    const movie = localStorage.getItem('filmsQueue').find(movie => movie.original_title === selectFilm.original_title);

    if(localStorage) {
        toWatchedArray.push(...localStorage);
    };

    if(localStorage && !movie) {
        toQueueArray.push(selectFilm);
    } else {
        if(toQueueArray.length === 0) return;
        const indexOfTheMovieToBeDeleted = toQueueArray.indexOf(movie);
        toQueueArray.splice(indexOfTheMovieToBeDeleted, 1);
    };

<<<<<<< HEAD
    localStorage.setItem('filmsQueue', JSON.stringify(toQueueArray));
    monitorButtonStatusText();
=======
    localStorage.setItem(filmsQueue, JSON.stringify(toWatchedArray));
    // monitorButtonStatusText();
>>>>>>> dev
};

const drawWatchedFilmList = () => {
    const toWatchedArray = [];
    const localStorage = JSON.parse(localStorage.getItem('filmsWatched'));
    const movie = localStorage.getItem('filmsWatched').find(movie => movie.original_title === selectFilm.original_title);
    
    if(localStorage) {
        toWatchedArray.push(...localStorage);
    };

    if(localStorage && !movie) {
        toWatchedArray.push(selectFilm);
    } else {
        if(toWatchedArray.length === 0) return;
        const indexOfTheMovieToBeDeleted = toWatchedArray.indexOf(movie);
        toWatchedArray.splice(indexOfTheMovieToBeDeleted, 1);
    };

<<<<<<< HEAD
    localStorage.setItem('filmsWatched', JSON.stringify(toWatchedArray));
    monitorButtonStatusText();
=======
    localStorage.setItem(filmsWatched, JSON.stringify(toWatchedArray));
    // monitorButtonStatusText();
>>>>>>> dev
};

const showDetails = (selectFilm) => {
    const temp = detailsFilms(getDetails);
    refs.detailsPage.innerHTML = temp;
    // monitorButtonStatusText();
};

export { showDetails, drawQueueFilmList, drawWatchedFilmList };