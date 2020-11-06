import refs from './refs';
import teamTemplate from '../template/team.hbs';
import team from './team';

function renderTeamModal() {
  const markup = teamTemplate(team);
  refs.rootTeamModal.insertAdjacentHTML('beforeend', markup);
}

function openTeamModal() {
  refs.logoFooter = document.querySelector('.command_logo');
  refs.logoFooter.addEventListener('click', onOpenTeamModal);
}

function onOpenTeamModal() {
  console.log('open');
  refs.rootTeamModal.classList.add('is-open');
  refs.rootTeamModal.addEventListener('click', onCloseTeamModal);
  window.addEventListener('keydown', onPressKey);
}

function onPressKey(e) {
  if (e.code === 'Escape') {
    closeTeamModal();
  }
}

function onCloseTeamModal(e) {
  if (
    e.target.className !== 'lightbox__overlay' &&
    e.target.className !== 'lightbox__button'
  ) {
    return;
  }
  closeTeamModal();
}

function closeTeamModal() {
  refs.rootTeamModal.classList.remove('is-open');
  window.removeEventListener('keydown', onPressKey);
}

export { openTeamModal, renderTeamModal };
