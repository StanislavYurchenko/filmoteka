import refs from './refs';
import homePageTpl from '../template/homePageContent.hbs';
import 'material-design-icons/iconfont/material-icons.css';
import { formattingFetchData, fetchPopularMoviesList, baseUrl } from './initialHomePage';
import { debounce } from "debounce";

const apiKey = '81f248d3c9154788229a5419bb33091a';
let formRef = null;
let btn_next = null;
let btn_prev = null;
let page_span = null;
let require = null;
let inputRef = null;

const controlGlobalPage = {
  isStartGlobalPage: true,
  setStartPage() {
    this.isStartGlobalPage = true;
    if (require !== null) {
      require.classList.add('is-hidden');
      formRef.reset();
    }

  },
  setSomePage() {
    this.isStartGlobalPage = false;
  }
}

const renderForm = template => {
  refs.homePage.insertAdjacentHTML('afterbegin', template());
};

const renderNavigate = template => {
  refs.homePage.insertAdjacentHTML('beforeend', template());
};

const debouncedSearchFilmsHandler =  debounce(event => searchFilmsHandler(event), 1000);

function usersSearch() {
  formRef = refs.homePage.querySelector('form');
  formRef.addEventListener('submit', searchFilmsHandler);
  inputRef = formRef.elements.query;
  inputRef.addEventListener('input', debouncedSearchFilmsHandler);
  btn_next = refs.homePage.querySelector('.button-next');
  btn_prev = refs.homePage.querySelector('.button-prev');
  page_span = refs.homePage.querySelector('.page');
  btn_next.addEventListener('click', handlerNext);
  btn_prev.addEventListener('click', handlerPrev);
  if (films.isStartPage) {
    btn_prev.setAttribute('disabled', 'disabled');
  }
}

function homePagePagination() {
  fetchPopularMoviesList(baseUrl, films.pageNumb, apiKey).then(data => {
    changeButtonPagActive(data);
    const arrData = data.results;
    refs.homePage.querySelector('.home-page-list').innerHTML = homePageTpl(formattingFetchData(arrData));
    page_span.innerHTML = films.pageNumb;
  })
}

function handlerNext() {
  if (!controlGlobalPage.isStartGlobalPage) {
    films.incrementPage();
    fetchMovies();
    btn_prev.removeAttribute('disabled');
  } else {
    films.incrementPage();
    homePagePagination()
    btn_prev.removeAttribute('disabled');
  }
}

function handlerPrev() {
  if (!controlGlobalPage.isStartGlobalPage) {
    if (films.isStartPage === false) {
      films.decrementPage();
      fetchMovies();
    }
    if (films.pageNumb === 1) {
      btn_prev.setAttribute('disabled', 'disabled');
    }
  } else {
    if (films.isStartPage === false) {
      films.decrementPage();
      homePagePagination()
    }
    if (films.pageNumb === 1) {
      btn_prev.setAttribute('disabled', 'disabled');
    }
  }
}

function searchFilmsHandler(event) {
  event.preventDefault();
  films.resetPage();
  const formData = new FormData(formRef);
  const userInput = formData.get('query');
  if (!userInput) {
    homePagePagination()
    controlGlobalPage.setStartPage()
    return
  }
  films.inputValue = userInput;
  fetchMovies();
  controlGlobalPage.setSomePage();
}

function changeButtonPagActive(data) {
  let isLastPage = (data.page === data.total_pages);
  let isFirstPage = (data.page === 1);
  if (isLastPage) {
    btn_next.setAttribute('disabled', 'disabled');
  } else btn_next.removeAttribute('disabled');

  if (isFirstPage) {
    btn_prev.setAttribute('disabled', 'disabled');
  } else btn_prev.removeAttribute('disabled');
}

function fetchMovies() {
  films.fetchFilms().then(data => {
    require = refs.homePage.querySelector('.form-search__requirements');
    if (data.length === 0) {
      require.classList.remove('is-hidden');
      btn_next.setAttribute('disabled', 'disabled');
    } else {
      require.classList.add('is-hidden');
    }
    if (films.inputValue === ' ') return;
    const markup = data.length === 0 ? '' : homePageTpl(formattingFetchData(data));
    refs.homePage.querySelector('.home-page-list').innerHTML = markup;
    page_span.innerHTML = films.pageNumb;

  });
}

const films = {
  isStartPage: true,
  inputValue: '',
  pageNumb: 1,
  async fetchFilms() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${this.inputValue}&page=${this.pageNumb}&include_adult=false`,
      );
      const data = await response.json();
      changeButtonPagActive(data);
      return data.results;
    } catch (error) {
      throw error;
    }
  },
  resetPage() {
    this.pageNumb = 1;
  },
  incrementPage() {
    this.pageNumb++;
    this.isStartPage = false;
  },
  decrementPage() {
    this.pageNumb--;
    if (this.pageNumb === 1) {
      this.isStartPage = true;
    }
  },
  get query() {
    return this.inputValue;
  },
  set query(value) {
    this.inputValue = value;
  },
};

export { usersSearch, renderForm, renderNavigate, controlGlobalPage, homePagePagination };
