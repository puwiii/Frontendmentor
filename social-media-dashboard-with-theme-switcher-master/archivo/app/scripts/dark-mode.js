let toggle = document.getElementById('toggleButton');
let main = document.getElementById('main');
let header = document.getElementById('header');
let circle = document.getElementById('circle');
let cards = document.getElementsByClassName('card');
let overview = document.getElementById('overview')
let dailyCards = document.getElementsByClassName('dailyCard');

toggle.addEventListener('click' , function(){

    this.classList.toggle('toggle-active');
    main.classList.toggle('dark-mode');
    circle.classList.toggle('dark-mode');
    header.classList.toggle('dark-mode');

    for (i = 0; i < cards.length; i++) {
        cards[i].classList.toggle('dark-mode');
    }

    overview.classList.toggle('dark-mode');

    for (i = 0; i < dailyCards.length; i++) {
        dailyCards[i].classList.toggle('dark-mode');
    }
})
