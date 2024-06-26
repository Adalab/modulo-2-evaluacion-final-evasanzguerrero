'use strict';
const cardsElement = document.querySelector('.js__cards');

let data = [];

fetch('https://api.disneyapi.dev/character?pageSize=50')
  .then(response => response.json())
  .then(json => {
    data = json.data;
    renderCharacters(data);
  })

  function renderCharacters(charactersList) {
    for(const character of charactersList) {
      let image 
      if (character.imageUrl != undefined){
        image = character.imageUrl
      } else {
        image ='https://via.placeholder.com/210x295/ffffff/555555/?text=Disney';
      }
      cardsElement.innerHTML +=`<li class="card">
          <img class="card_img" src="${image}" alt="">
          <div class="card_name">${character.name}</div>
        </li>` 
    }
  }


