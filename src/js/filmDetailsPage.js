import getDetails from '../data/getDetails';
import detailsFilms from '../template/detailsPage.hbs';
import 'material-design-icons/iconfont/material-icons.css';
import refs from './refs';


const buttonWatched = document.querySelector('.details__button-watched');
const buttonQueue = document.querySelector('.details__button-queue');


// const monitorButtonStatusText = () => {

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

// };

const drawQueueFilmList = () => {
    const toQueueArray = [];
    const localStorage = JSON.parse(localStorage.getItem(filmsQueue));
    const movie = localStorage.getItem(filmsQueue.find(movie => movie.original_title === selectFilm.original_title));

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

    localStorage.setItem(filmsQueue, JSON.stringify(toWatchedArray));
    // monitorButtonStatusText();
};

const drawWatchedFilmList = () => {
    const toWatchedArray = [];
    const localStorage = JSON.parse(localStorage.getItem(filmsWatched));
    const movie = localStorage.getItem(filmsWatched.find(movie => movie.original_title === selectFilm.original_title));
    
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

    localStorage.setItem(filmsWatched, JSON.stringify(toWatchedArray));
    // monitorButtonStatusText();
};

const showDetails = (selectFilm) => {
    const temp = detailsFilms(getDetails);
    refs.detailsPage.innerHTML = temp;
    // monitorButtonStatusText();
};

<<<<<<< HEAD
export default { showDetails, drawQueueFilmList, drawWatchedFilmList };
console.log(showDetails());
=======
export { showDetails, drawQueueFilmList, drawWatchedFilmList };
>>>>>>> 4515e48c3a294c3ab7111ec0b7b5133e9228e6da
