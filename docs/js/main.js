const c=document.querySelector(".js__cards"),f=document.querySelector(".js__btn"),_=document.querySelector(".js__input"),m=document.querySelector(".js__favourites");let n=[],s=[];fetch("https://api.disneyapi.dev/character?pageSize=50").then(t=>t.json()).then(t=>{n=t.data,o(c,n),l()});function l(){const t=c.querySelectorAll(".js__card");for(const a of t)a.addEventListener("click",e=>{e.preventDefault(),e.currentTarget.classList.add("favourite");const r=e.currentTarget.querySelector(".js__card__img").src,i=e.currentTarget.querySelector(".js__card_name").textContent;let d=!1;for(const u of s)u.name===i&&(d=!0);d||(c.classList.add("three_columns"),c.classList.remove("four_columns"),s.push({imageUrl:r,name:i}),o(m,s))})}function o(t,a){t.innerHTML="";for(const e of a){let r;e.imageUrl!=null?r=e.imageUrl:r="https://via.placeholder.com/210x295/ffffff/555555/?text=Disney",t.innerHTML+=`<li class="card js__card">
          <img class="card_img js__card__img" src="${r}" alt="">
          <div class="card_name js__card_name">${e.name}</div>
        </li>`}}f.addEventListener("click",t=>{t.preventDefault();const a=_.value.toLowerCase();fetch(`https://api.disneyapi.dev/character?pageSize=50&name=${a}`).then(e=>e.json()).then(e=>{n=e.data,o(c,n),l()})});
//# sourceMappingURL=main.js.map
