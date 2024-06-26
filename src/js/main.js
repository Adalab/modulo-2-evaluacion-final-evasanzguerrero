'use strict';
const cardsElement = document.querySelector('.js__cards');
const searchBtn = document.querySelector('.js__btn');
const searchInput = document.querySelector('.js__input');

let data = [];

fetch('https://api.disneyapi.dev/character?pageSize=50')
  .then(response => response.json())
  .then(json => {
    data = json.data;
    renderCharacters(data);
    const cards = document.querySelectorAll('.js__card');
    for(const card of cards) {
      card.addEventListener('click', (ev) =>{
        ev.currentTarget.classList.add('favourite')
      })
    }
  })

  function renderCharacters(charactersList) {
    cardsElement.innerHTML = "";
    for(const character of charactersList) {
      let image 
      if (character.imageUrl != undefined){
        image = character.imageUrl
      } else {
        image ='https://via.placeholder.com/210x295/ffffff/555555/?text=Disney';
      }
      cardsElement.innerHTML +=`<li class="card js__card">
          <img class="card_img" src="${image}" alt="">
          <div class="card_name">${character.name}</div>
        </li>` 
    }
  }
  searchBtn.addEventListener('click', (ev) => {
    ev.preventDefault();
    const characterFilteredByName = data.filter(element => element.name.toLowerCase().includes(searchInput.value.toLowerCase()))
    renderCharacters(characterFilteredByName)
  })
  
  


