import footerTemplate from '../template/footer.hbs';
import headerTemplate from '../template/header.hbs';
import refs from './refs';
import 'material-design-icons/iconfont/material-icons.css';
import { showDetails } from './filmDetailsPage';
import { drawQueueFilmList } from './libraryPage';
import { baseUrl, apiKey } from './initialHomePage';
import { controlGlobalPage, homePagePagination } from './searchAndPaginationHomePage';


// import { data } from 'autoprefixer';
// const a = showDetails();
// console.log(a);

const activeHomePage = () => {
  refs.homePage.classList.remove('notActivePage');
  refs.myFilmLibraryPage.classList.add('notActivePage');
  refs.detailsPage.classList.add('notActivePage');
};

const activeLibraryPage = () => {
  refs.myFilmLibraryPage.classList.remove('notActivePage');
  refs.detailsPage.classList.add('notActivePage');
  refs.homePage.classList.add('notActivePage');
};

const activeDetailsPage = (movied, isLibraryFilm) => {
  refs.homePage.classList.add('notActivePage');
  refs.myFilmLibraryPage.classList.add('notActivePage');
  refs.detailsPage.classList.remove('notActivePage');
  showDetails(movied, isLibraryFilm);
};

refs.header.insertAdjacentHTML('afterbegin', headerTemplate());
refs.footer.insertAdjacentHTML('afterbegin', footerTemplate());

refs.linkLogo = refs.header.querySelector('.js-logo');
refs.linkHome = refs.header.querySelector('.js-home');
refs.linkMyLibrary = refs.header.querySelector('.js-myLibrary');

// console.log(refs.linkHome, refs.linkMyLibrary, refs.linkLogo);

refs.linkLogo.addEventListener('click', event => {
  console.log('Слушаем Лого');
  homePagePagination();
  controlGlobalPage.setStartPage();
  // activeDetailsPage()
  activeHomePage();
});

refs.linkHome.addEventListener('click', event => {
  console.log('Слушаем Хоме');
  homePagePagination();
  controlGlobalPage.setStartPage();
  activeHomePage();
});

refs.linkMyLibrary.addEventListener('click', event => {
  console.log('Слушаем Библиотеку');
  activeLibraryPage();
  drawQueueFilmList();
});

refs.homeList.addEventListener('click', event => {
  console.log('homeList');
  const { target, currentTarget } = event;

  if (target.nodeName !== 'LI') {
    console.log('Не лишка выходим');
    return;
  }

  const movieId = target.dataset.itemid;
  console.log(movieId);

  //   console.dir( target);
  //   console.dir(currentTarget);

  fetch(`${baseUrl}/3/movie/${movieId}?api_key=${apiKey}&language=en-US`)
    .then(res => res.json())
    .then(data => {
      activeDetailsPage(data);
    });
});

// console.log(refs);

export { activeHomePage, activeDetailsPage };
