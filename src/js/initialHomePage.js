import filmListTemplate from '../template/homePageContent.hbs';
import refs from './refs.js';
const apiKey = '81f248d3c9154788229a5419bb33091a';
const baseUrl = 'https://api.themoviedb.org';


let pageNumber = 1;

const renderFilmList = (template, arrFilms) => {
  const ref = refs.homePage.querySelector('ul')
  ref.innerHTML = filmListTemplate(arrFilms);

};


const fetchPopularMoviesList = (baseUrl, pageNumber, apiKey) => {
  return fetch(
    `${baseUrl}/3/movie/popular?api_key=${apiKey}&language=en-US&page=${pageNumber}&include_adult=false`,
  ).then(res => res.json());
};


const formattingFetchData = (arrData) => {
  const baseImageDataUrl = `https://image.tmdb.org/t/p/w500/`;
  const pathImageDefault = `./images/temp.png`;
  return arrData.map(el => {
    let imgPath = el.backdrop_path;
    let imgPathBig = el.poster_path;
    let release_date = el.release_date;
    (typeof release_date === 'undefined' || release_date === "")
      ? el.release_date = 'unknown'
      : el.release_date = el.release_date.slice(0, 4);
    const verifyImgBigPath = () => {
      el.backdrop_path = (typeof imgPathBig !== "string") 
        ? `${pathImageDefault}`
        : `${baseImageDataUrl}${imgPathBig}`      
    }
    (typeof imgPath !== "string")
      ? verifyImgBigPath()
      : el.backdrop_path = `${baseImageDataUrl}${imgPath}`
    return el
  })
}



export { renderFilmList, fetchPopularMoviesList, baseUrl, apiKey, pageNumber, formattingFetchData };
