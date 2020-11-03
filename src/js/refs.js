const refs = {
  header: document.querySelector('#root-header'),
  footer: document.querySelector('#root-footer'),
  homePage: document.querySelector('#root-home-page'),
  myFilmLibraryPage: document.querySelector('#root-my-film-library-page'),
  detailsPage: document.querySelector('#root-details-page'),
  form: null,
  libraryList: document.querySelector('.library-list'),
  linkHome: null,
  linkMyLibrary: null,
  linkLogo: null,
  homeList: document.querySelector('.home-page-list'),
  watchedBtn: null,
  queueBtn: null,
  modalUserReg: document.querySelector('#modal-user-reg'),
  formLogin: document.querySelector('[data-type="form-login"]'),
  formSignin: document.querySelector('[data-type="form-signin"]'),
};
export default refs;
