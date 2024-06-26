'use strict';
const cardsElement = document.querySelector('.js__cards');
const searchBtn = document.querySelector('.js__btn');
const searchInput = document.querySelector('.js__input');
const favouritesElement = document.querySelector('.js__favourites');

let data = [];
let favourites = [];

fetch('https://api.disneyapi.dev/character?pageSize=50')
  .then(response => response.json())
  .then(json => {
    data = json.data;
    render(cardsElement, data);
    addCardEventListener();
  })

  function addCardEventListener() {
    const cards = cardsElement.querySelectorAll('.js__card');
    for(const card of cards) {
      card.addEventListener('click', (ev) =>{
        ev.preventDefault();
        ev.currentTarget.classList.add('favourite');
        const imageUrl = ev.currentTarget.querySelector('.js__card__img').src;
        const name = ev.currentTarget.querySelector('.js__card_name').textContent;
        let found = false;
        for(const favorite of favourites ) {
          if(favorite.name === name) {
            found = true;
          }
        }
        if(!found) {
          cardsElement.classList.add('three_columns');
          cardsElement.classList.remove('four_columns');
          favourites.push({imageUrl,name});
          render(favouritesElement, favourites);
        }
      });
    }
  }

  function render(element, charactersList) {
    element.innerHTML = "";
    for(const character of charactersList) {
      let image;
      if (character.imageUrl != undefined){
        image = character.imageUrl;
      } else {
        image ='https://via.placeholder.com/210x295/ffffff/555555/?text=Disney';
      }
      element.innerHTML +=`<li class="card js__card">
          <img class="card_img js__card__img" src="${image}" alt="">
          <div class="card_name js__card_name">${character.name}</div>
        </li>`;
    }
  }
  searchBtn.addEventListener('click', (ev) => {
    ev.preventDefault();
    const name = searchInput.value.toLowerCase();
    fetch(`https://api.disneyapi.dev/character?pageSize=50&name=${name}`)
      .then(response => response.json())
      .then(json => {
        data = json.data;
        render(cardsElement, data);
        addCardEventListener();
      });
  });
  
  


