import './sass/main.scss';
import './js/importImg';
import { renderHeader, renderFooter, addHeaderListener } from './js/navigation';
import refs from './js/refs.js';
import {
  renderFilmList,
  fetchPopularMoviesList,
  baseUrl,
  apiKey,
  pageNumber,
  formattingFetchData,
} from './js/initialHomePage';
import {
  usersSearch,
  renderForm,
  renderNavigate,
} from './js/searchAndPaginationHomePage';
import { serviceLibraryButtons } from './js/libraryPage';
import formTemplate from './template/homePageForm.hbs';
import filmListTemplate from './template/homePageContent.hbs';
import navigateTemplate from './template/homePageNav.hbs';
import myFilmLibraryPageButtons from './template/myFilmLibraryPageButtons.hbs';
import {
  FormRegModalPlugin,
  renderRegAndAuthForm,
} from './js/formRegPlugin.js';
import { TabPlugin } from './js/TabPlugin.js';
import { openTeamModal, renderTeamModal } from './js/teamModal';

// render header
renderHeader();

// render form
renderForm(formTemplate);

// render navigation
renderNavigate(navigateTemplate);

// render footer
renderFooter();

//render team modal
renderTeamModal();
openTeamModal();

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

history.pushState({ page: '/home' }, 'title 1', '/home');

//render query
usersSearch();

// render reg and auth form
renderRegAndAuthForm();

export const formRegModalPlugin = new FormRegModalPlugin({
  selectorButtonOpenModal: '[data-type="button-user"]',
});

const tabUserRegLog = new TabPlugin({
  rootSelector: '#tabs-reg-log',
  activeControlClass: 'tabs_controls-item--active',
  firstActivCntrlID: 1,
});
