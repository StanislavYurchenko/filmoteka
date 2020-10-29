// import './searchAndPaginationHomePage.js';
// import updateHomeMarkup from './searchAndPaginationHomePage';

// updateHomeMarkup();
// import getDetails from '../data/getDetails';
// import getPopular from '../data/getPopular';

// console.log(getDetails);
// console.log(getPopular);

import formTemplate from '../template/homePageForm.hbs';
import filmListTemplate from '../template/homePageContent.hbs';
import navigateTemplate from '../template/homePageNav.hbs';
import refs from './refs.js';
const apiKey = '81f248d3c9154788229a5419bb33091a';
const genres = null;
const baseUrl = 'https://api.themoviedb.org';

let pageNumber = 1;

const renderFilmList = (template, arrFilms) => {
  const ref = refs.homePage.querySelector('form')
  ref.insertAdjacentHTML('afterend', filmListTemplate(arrFilms))

};

const fetchPopularMoviesList = (baseUrl, pageNumber, apiKey) => {
  return fetch(
    `${baseUrl}/3/search/movie?api_key=${apiKey}&language=en-US&query=strong&page=${pageNumber}&include_adult=false`,
  ).then(res => res.json());
};

export { renderFilmList, fetchPopularMoviesList, baseUrl, apiKey, pageNumber };
