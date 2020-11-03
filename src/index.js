import './sass/main.scss';
import { renderHeader, renderFooter, addHeaderListener } from './js/navigation';
import img from './images/temp.png';
import img_footer from './images/footer_logo/me_logo.png';
import img_user from './images/user_form/user_ico.png';
import './js/authorizationAndMoviesDatabase';
import refs from './js/refs.js';
import { renderFilmList, fetchPopularMoviesList, baseUrl, apiKey, pageNumber, formattingFetchData } from './js/initialHomePage';
import { usersSearch, renderForm, renderNavigate } from './js/searchAndPaginationHomePage';
import { serviceLibraryButtons } from './js/libraryPage';
import formTemplate from './template/homePageForm.hbs';
import filmListTemplate from './template/homePageContent.hbs';
import navigateTemplate from './template/homePageNav.hbs';
import myFilmLibraryPageButtons from './template/myFilmLibraryPageButtons.hbs';
import { FormRegModalPlugin } from './js/formRegPlugin.js'
import { TabPlugin } from './js/TabPlugin.js'
// render header
renderHeader();

// render form
renderForm(formTemplate);

// render navigation
renderNavigate(navigateTemplate);

// render footer
renderFooter();

// add header listeners
addHeaderListener();

// render library buttons
serviceLibraryButtons(myFilmLibraryPageButtons);

// render movies
fetchPopularMoviesList(baseUrl, pageNumber, apiKey).then(data => {
  const arrData = data.results;
  renderFilmList(filmListTemplate, formattingFetchData(arrData));
  refs.homePage.querySelector('.page').innerHTML = pageNumber;
});

history.pushState({ page: "/home" }, "title 1", "/home");

//render query
usersSearch();


const optionsFormReg = {
  selectorButtonOpenModal: '[data-type="button-user"]'
}
const formRegModalPlugin = new FormRegModalPlugin(optionsFormReg)


const tabUserRegLog = new TabPlugin({
  rootSelector: "#tabs-reg-log",
  activeControlClass: 'tabs_controls-item--active',
  firstActivCntrlID: 1
})