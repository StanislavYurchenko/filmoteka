import MicroModal from 'micromodal';
import refs from './refs.js';
import registrationAndAuthFormTemplate from '../template/registrationAndAuthForm.hbs';

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
    constructor({ selectorButtonOpenModal }) {
        this.buttonOpenModalRef = document.querySelector(selectorButtonOpenModal);
        this._bindEvents();
    }
    _bindEvents() {
        this.buttonOpenModalRef.addEventListener('click', this._handlerOpenModal.bind(this))
    }
    _handlerOpenModal(event) {
        MicroModal.show('modal-user-reg');
    }
}

function renderRegAndAuthForm() {
  refs.regAndAuth.insertAdjacentHTML('afterbegin', registrationAndAuthFormTemplate());
}

export {renderRegAndAuthForm, FormRegModalPlugin}