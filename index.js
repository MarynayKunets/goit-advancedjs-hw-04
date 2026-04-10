import{a as P,S as C,i as c}from"./assets/vendor-Cu43xbyG.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function a(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(e){if(e.ep)return;e.ep=!0;const o=a(e);fetch(e.href,o)}})();const q="https://pixabay.com/api/",M="55309008-edb7c4bb1c6dba6c84cf593ac";async function d(s,t){const a=new URLSearchParams({key:M,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15});return(await P.get(`${q}?${a}`)).data}const m=document.querySelector(".gallery"),p=document.querySelector(".loader"),h=document.querySelector(".load-more"),$=new C(".gallery a",{captionsData:"alt",captionDelay:250});function g(s){const t=s.map(({webformatURL:a,largeImageURL:r,tags:e,likes:o,views:i,comments:x,downloads:v})=>`
        <li class="gallery-item">
          <a class="gallery-link" href="${r}">
            <img
              class="gallery-image"
              src="${a}"
              alt="${e}"
            />
          </a>
          <div class="info">
            <p class="info-item">
              <span class="info-label">Likes</span>
              <span>${o}</span>
            </p>
            <p class="info-item">
              <span class="info-label">Views</span>
              <span>${i}</span>
            </p>
            <p class="info-item">
              <span class="info-label">Comments</span>
              <span>${x}</span>
            </p>
            <p class="info-item">
              <span class="info-label">Downloads</span>
              <span>${v}</span>
            </p>
          </div>
        </li>
      `).join("");m.insertAdjacentHTML("beforeend",t),$.refresh()}function R(){m.innerHTML=""}function y(){p.classList.add("is-visible")}function b(){p.classList.remove("is-visible")}function L(){h.classList.remove("is-hidden")}function l(){h.classList.add("is-hidden")}const w=document.querySelector(".form"),B=document.querySelector(".load-more");let u="",n=1,f=0;const S=15;w.addEventListener("submit",E);B.addEventListener("click",W);async function E(s){s.preventDefault();const t=s.currentTarget.elements["search-text"].value.trim();if(t){u=t,n=1,R(),l(),y();try{const a=await d(u,n);if(f=a.totalHits,!a.hits||a.hits.length===0){c.show({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",backgroundColor:"#ef4040",messageColor:"#fafafb",maxWidth:"432px",timeout:3e3,close:!0});return}g(a.hits);const r=Math.ceil(f/S);n<r?L():(l(),c.show({message:"We're sorry, but you've reached the end of search results.",position:"topRight",backgroundColor:"#4e75ff",messageColor:"#fafafb",maxWidth:"432px",timeout:3e3,close:!0}))}catch{c.show({message:"Something went wrong. Please try again!",position:"topRight",backgroundColor:"#ef4040",messageColor:"#fafafb",maxWidth:"432px",timeout:3e3,close:!0})}finally{b(),w.reset()}}}async function W(){n+=1,l(),y();try{const s=await d(u,n);g(s.hits);const t=Math.ceil(f/S);n<t?L():(l(),c.show({message:"We're sorry, but you've reached the end of search results.",position:"topRight",backgroundColor:"#4e75ff",messageColor:"#fafafb",maxWidth:"432px",timeout:3e3,close:!0})),O()}catch{c.show({message:"Something went wrong. Please try again!",position:"topRight",backgroundColor:"#ef4040",messageColor:"#fafafb",maxWidth:"432px",timeout:3e3,close:!0})}finally{b()}}function O(){const s=document.querySelector(".gallery-item");if(!s)return;const t=s.getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
