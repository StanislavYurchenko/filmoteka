import getDetails from '../data/getDetails';
import detailsFilms from '../template/detailsPage.hbs';
import 'material-design-icons/iconfont/material-icons.css';
import refs from './refs';


const buttonWatched = document.querySelector('.details__button-watched');
const buttonQueue = document.querySelector('.details__button-queue');


const monitorButtonStatusText = () => {

    // if(localStorage.getItem(filmsQueue) === x) {
        
    // }
};

const drawQueueFilmList = () => {

};

const drawWatchedFilmList = () => {
    
};

const showDetails = (selectFilm) => {
    const temp = detailsFilms(getDetails);
    refs.detailsPage.innerHTML = temp;
    monitorButtonStatusText();
};

export { showDetails, drawQueueFilmList, drawWatchedFilmList, buttonWatched, buttonQueue };