import MicroModal from 'micromodal';
import refs from './refs.js';
import registrationAndAuthFormTemplate from '../template/registrationAndAuthForm.hbs';
import { userAuthorization, userRegistration } from './authorizationAndMoviesDatabase';
import { changeLoginBtnStatus } from './navigation';


MicroModal.init({
    onShow: modal => console.info(`${modal.id} is shown`), // [1]
    onClose: modal => console.info(`${modal.id} is hidden`), // [2]
    openTrigger: 'data-type="button-user"', // [3]
    closeTrigger: 'data-custom-close', // [4]
    openClass: 'is-open', // [5]
    disableScroll: true, // [6]
    disableFocus: false, // [7]
    awaitOpenAnimation: false, // [8]
    awaitCloseAnimation: false, // [9]
    debugMode: false // [10]
});


class FormRegModalPlugin {
    static openModal() {
        MicroModal.show('modal-user-reg');
    }

    constructor({ selectorButtonOpenModal }) {
        this.buttonOpenModalRef = document.querySelector(selectorButtonOpenModal);
        this._bindEvents();
        this._isLogged = false;
    }
    _bindEvents() {
        this.buttonOpenModalRef.addEventListener('click', this._handlerOpenModal.bind(this))
    }
    _handlerOpenModal(event) {
        console.log("click")
        if (!this._isLogged) {
            MicroModal.show('modal-user-reg');
        }
    }

    chendgeStatLogin() {
        this._isLogged = true;
    }
    chendgeStatUnlogin() {
        setTimeout(() => { this._isLogged = false; }, 0)
    }
}

function renderRegAndAuthForm() {
    refs.regAndAuth.insertAdjacentHTML('afterbegin', registrationAndAuthFormTemplate());

    const formLogin = document.querySelector('[data-type="form-login"]');
    const formSignup = document.querySelector('[data-type="form-signin"]');

    formLogin.addEventListener('submit', formLoginHolder);
    formSignup.addEventListener('submit', formSignupHolder);

    function formLoginHolder(event) {
        userAuthorization(event, changeLoginBtnStatus);
    }

    function formSignupHolder(event) {
        userRegistration(event, changeLoginBtnStatus);
    }

}

export { renderRegAndAuthForm, FormRegModalPlugin }