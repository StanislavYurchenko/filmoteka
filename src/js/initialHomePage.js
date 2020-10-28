// import './searchAndPaginationHomePage.js';
// import updateHomeMarkup from './searchAndPaginationHomePage';

// updateHomeMarkup();
import getDetails from '../data/getDetails';
import getPopular from '../data/getPopular';

console.log(getDetails);
console.log(getPopular);

import FilmListTemplate from '../template/homePage.hbs';
import refs from './refs.js';

const apiKey = '81f248d3c9154788229a5419bb33091a';
const genres = null;

const baseUrl = 'https://api.themoviedb.org';

let pageNumber = 1;

const renderFilmList = (template, arrFilms, renderRefSelector) => {
  renderRefSelector.innerHTML = template(arrFilms);
};

const fetchPopularMoviesList = (baseUrl, pageNumber, apiKey) => {
<<<<<<< HEAD
    return fetch(`${baseUrl}/3/search/movie?api_key=${apiKey}&language=en-US&query=strong&page=${pageNumber}&include_adult=false`).then(res => res.json());
}

fetchPopularMoviesList(baseUrl, pageNumber, apiKey).then(data => {
    const arrData = data.results;
    const formatDate = arrData.map(el => {
        if (typeof el.backdrop_path === "object") {
            el.backdrop_path = `../images/bmp.jpg`;
        } else {
            el.backdrop_path = `https://image.tmdb.org/t/p/w500/${el.backdrop_path}`
        }
        console.log(el.backdrop_path)
        return el
    })
    renderFilmList(FilmListTemplate, formatDate, refs.homePage);
})

export default { fetchPopularMoviesList, pageNumber, apiKey, renderFilmList, baseUrl }
=======
  return fetch(
    `${baseUrl}/3/search/movie?api_key=${apiKey}&language=en-US&query=strong&page=${pageNumber}&include_adult=false`,
  ).then(res => res.json());
};

// const fetchGenres = (baseUrl, apiKey) => {
//     return fetch(`${baseUrl}/3/genre/movie/list?api_key=${apiKey}&language=en-US`).then(res => res.json());
// }

fetchPopularMoviesList(baseUrl, pageNumber, apiKey).then(data => {
  const arrData = data.results;
  console.log(data);
  renderFilmList(FilmListTemplate, arrData, refs.homePage);
});

export default {
  fetchPopularMoviesList,
  pageNumber,
  apiKey,
  renderFilmList,
  baseUrl,
};
>>>>>>> dev
