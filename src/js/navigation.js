import footerTemplate from '../template/footer.hbs'
console.log(footerTemplate());
const footerRef = document.querySelector('#root-home-page');
console.log(footerRef);

footerRef.innerHTML = footerTemplate();