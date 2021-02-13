let hamburger = document.querySelector('.header__hamburger');
let menu = document.querySelector('.header__menu');
let header = document.querySelector('.header');

hamburger.addEventListener('click', ()=>{
    hamburger.classList.toggle('opened');
    menu.classList.toggle('opened');
    header.classList.toggle('menu-opened');
})