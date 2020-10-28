import refs from './refs';
import homePageTpl from '../template/homePage.hbs';
import 'material-design-icons/iconfont/material-icons.css';
import renderFilmList from './initialHomePage';

function updateHomeMarkup() {
  const markup = homePageTpl();
  refs.homePage.insertAdjacentHTML('beforeend', markup);
}
updateHomeMarkup();

// refs.form = refs.homePage.querySelector('.form-search');
// const iputRef = document.querySelector('.form-search__input');
// const btnNextRef = document.querySelector('.button-next');
// const btnPrevRef = document.querySelector('.button-prev');
// const pageNum = document.getElementById('page');

// export default updateHomeMarkup;
const apiKey = '81f248d3c9154788229a5419bb33091a';

const films = {
  inputValue: '',
  pageNumb: 1,

  fetchFilms() {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${inputValue}&page=${pageNumb}&include_adult=false`;
    return fetch(url)
      .then(res => res.json())
      .then(({ movies }) => {
        this.incrementPage();

        return movies;
      });
  },
  resetPage() {
    this.pageNumb = 1;
  },
  incrementPage() {
    this.pageNumb += 1;
  },
  get query() {
    return this.inputValue;
  },
  set query(value) {
    this.inputValue = value;
  },
};

// const inputValue = '';
// let pageNumb = 1;

// function fetchFilms() {
//   const url = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${inputValue}&page=${pageNumb}&include_adult=false`;
//   return fetch(url)
//     .then(res => res.json())
//     .then(({ movies }) => {
//       this.incrementPage();

//       return movies;
//     });
// }

function searchFilms(event) {
  event.preventDefault();
  const form = event.currentTarget;
  films.query = form.elements.query.value;

  clearMoviesContainer();
  films.resetPage();
  fetchMovies();
  form.reset();
}

function fetchMovies() {
  films.fetchFilms().then(movies => {
    renderFilmList(homePageTpl, movies, refs.homePage);
  });
}

function clearMoviesContainer() {}

refs.form = refs.homePage.querySelector('.form-search');
refs.form.addEventListener('submit', searchFilms);

// function () {

// }

// let pageNumber = 1;
// const filmsOnPage = 6;

// function prevPage() {
//   if (pageNumber > 1) {
//     pageNumber--;
//     changePage(pageNumber);
//   }
// }

// function nextPage() {
//   if (pageNumber < numPage()) {
//     pageNumber++;
//     changePage(pageNumber);
//   }
// }

// function changePage(page) {
//   const btnNext = document.querySelector('.button-next');
//   const btnPrev = document.querySelector('.button-prev');
//   const pagination = document.querySelector('.pagination');
//   const pageNum = document.getElementById('page');

//   if (page < 1) page = 1;
//   if (page > numPages()) page = numPages();

//   pageNum.innerHTML = page;
// }
