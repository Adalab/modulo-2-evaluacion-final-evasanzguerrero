const r=document.querySelector(".js__cards"),s=document.querySelector(".js__btn"),i=document.querySelector(".js__input");let c=[];fetch("https://api.disneyapi.dev/character?pageSize=50").then(e=>e.json()).then(e=>{c=e.data,n(c)});function n(e){r.innerHTML="";for(const t of e){let a;t.imageUrl!=null?a=t.imageUrl:a="https://via.placeholder.com/210x295/ffffff/555555/?text=Disney",r.innerHTML+=`<li class="card">
          <img class="card_img" src="${a}" alt="">
          <div class="card_name">${t.name}</div>
        </li>`}}s.addEventListener("click",e=>{e.preventDefault();const t=c.filter(a=>a.name.toLowerCase().includes(i.value.toLowerCase()));n(t)});
//# sourceMappingURL=main.js.map
