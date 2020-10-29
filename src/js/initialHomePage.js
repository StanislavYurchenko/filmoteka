import filmListTemplate from '../template/homePageContent.hbs';
import refs from './refs.js';
const apiKey = '81f248d3c9154788229a5419bb33091a';
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


const formatDataNullImages = (arrData) => {
  const formatDate = arrData.map(el => {
    if (typeof el.backdrop_path === "object") {
      el.backdrop_path = `./images/temp.png`;
    } else {
      el.backdrop_path = `https://image.tmdb.org/t/p/w500/${el.backdrop_path}`
    }
    return el
  })
  return formatDate;
}



export { renderFilmList, fetchPopularMoviesList, baseUrl, apiKey, pageNumber };
