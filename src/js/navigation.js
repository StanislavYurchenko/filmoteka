import footerTemplate from '../template/footer.hbs';
import headerTemplate from '../template/header.hbs';
import refs from './refs'
import 'material-design-icons/iconfont/material-icons.css';
// import './refs';
// console.log(refs.header);
// console.log(filmlibraryTemplate());
// const footerRef = document.querySelector('#root-footer');
// const headerRef = document.querySelector('#root-header');
// console.log(footerRef);
// console.log(headerRef);
// footerRef.innerHTML = footerTemplate();
refs.header.insertAdjacentHTML("afterbegin", headerTemplate())
refs.footer.insertAdjacentHTML("afterbegin", footerTemplate())

refs.linkHome = document.querySelector('.js-home');
refs.linkMyLibrary = refs.header.querySelector('.js-myLibrary');

console.log(refs.linkHome, refs.linkMyLibrary);

refs.linkHome.addEventListener('click', (event) =>{
    console.log("Слушаем Хоме");
});

refs.linkMyLibrary.addEventListener('click', (event) =>{
    console.log("Слушаем Библиотеку");
});