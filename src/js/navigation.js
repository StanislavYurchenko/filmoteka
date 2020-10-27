import footerTemplate from '../template/footer.hbs';
import headerTemplate from '../template/header.hbs';
// import './refs';
// console.log(refs.header);
console.log(footerTemplate());
const footerRef = document.querySelector('#root-home-page');
const headerRef = document.querySelector('#root-header');
console.log(footerRef);
console.log(headerRef);
// footerRef.innerHTML = footerTemplate();
headerRef.insertAdjacentHTML("afterbegin", headerTemplate())
footerRef.insertAdjacentHTML("afterbegin", footerTemplate())