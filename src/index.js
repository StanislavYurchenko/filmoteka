import './sass/main.scss';
import bmp from './images/bmp.jpg';
import refs from './js/refs.js';
import './js/navigation';
import { renderFilmList, fetchPopularMoviesList, baseUrl, apiKey, pageNumber } from './js/initialHomePage';
import { usersSearch, renderForm, renderNavigate } from'./js/searchAndPaginationHomePage';


import formTemplate from './template/homePageForm.hbs';
import filmListTemplate from './template/homePageContent.hbs';
import navigateTemplate from './template/homePageNav.hbs';


// render form
renderForm(formTemplate);

//render navigations
renderNavigate(navigateTemplate);

// render movies
fetchPopularMoviesList(baseUrl, pageNumber, apiKey).then(data => {
  const arrData = data.results;
  renderFilmList(filmListTemplate, arrData, refs.homePage);
});

//render query
usersSearch();




