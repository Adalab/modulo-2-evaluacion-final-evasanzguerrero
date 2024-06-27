'use strict';
const cardsElement = document.querySelector('.js__cards');
const searchBtn = document.querySelector('.js__btn');
const searchInput = document.querySelector('.js__input');
const favouritesElement = document.querySelector('.js__favourites');

let data = [];
let favourites = [];

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
        render(favouritesElement, favourites, true);
        deleteFavouriteEvent()
      }
    });
  }
}
function deleteFavouriteEvent() {
  const favouriteButtons = favouritesElement.querySelectorAll('.js__card_btn_close')
  for(const favouritesButton of favouriteButtons) {
    favouritesButton.addEventListener('click', (ev) => {
      const deleteName = ev.currentTarget.parentElement.querySelector('.js__card_name').textContent
      favourites = favourites.filter(fav => fav.name !== deleteName)
      render(favouritesElement, favourites, true);
    });
  }
}
function render(element, charactersList, isFavourite) {
  element.innerHTML = "";
  for(const character of charactersList) {
    let image;
    if (character.imageUrl != undefined){
      image = character.imageUrl;
    } else {
      image ='https://via.placeholder.com/210x295/ffffff/555555/?text=Disney';
    }

    let button = "";
    if(isFavourite) {
      button = '<button class="card_btn_close js__card_btn_close">X</button>';
    }
    element.innerHTML +=`<li class="card js__card">
        ${button}
        <img class="card_img js__card__img" src="${image}" alt="">
        <div class="card_name js__card_name">${character.name}</div>
      </li>`;
  }
}
fetch('https://api.disneyapi.dev/character?pageSize=50')
  .then(response => response.json())
  .then(json => {
    data = json.data;
    render(cardsElement, data, false);
    addCardEventListener();
  })


searchBtn.addEventListener('click', (ev) => {
  ev.preventDefault();
  const name = searchInput.value.toLowerCase();
  fetch(`https://api.disneyapi.dev/character?pageSize=50&name=${name}`)
    .then(response => response.json())
    .then(json => {
      data = json.data;
      if (!Array.isArray(data)) {
        data = [];
        data.push(json.data);
      }
      render(cardsElement, data, false);
      addCardEventListener();
    });
});