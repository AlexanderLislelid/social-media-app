(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(e){if(e.ep)return;e.ep=!0;const n=t(e);fetch(e.href,n)}})();function S(o){localStorage.setItem("token",o)}function p(){return localStorage.getItem("token")}function A(){localStorage.removeItem("token")}function T(o){localStorage.setItem("apiKey",o)}function b(){return localStorage.getItem("apiKey")}const M="https://v2.api.noroff.dev/";async function P(o,s={}){const{body:t,...r}=s,e=b(),n=p(),a={"Content-Type":"application/json"};e&&(a["X-Noroff-API-Key"]=e),n&&(a.Authorization=`Bearer ${n}`);const l={method:t?"POST":"GET",...r,headers:{...a,...r.headers}};t&&(l.body=JSON.stringify(t));try{const i=await fetch(M+o,l),c=await i.json();if(!i.ok){const d=c.errors?.[0]?.message||"An unknown API error occurred.";throw new Error(d)}return c}catch(i){throw console.error("API Client Error:",i),i}}const E=o=>P(o),x=(o,s)=>P(o,{body:s});function O(){const o=document.getElementById("post-modal"),s=document.getElementById("modal-close");function t(){o.classList.add("hidden"),document.body.classList.remove("overflow-hidden"),o.classList.remove("flex"),document.getElementById("post-modal-content").innerHTML=""}s.onclick=t}async function D(o){const s=document.getElementById("post-modal"),t=document.getElementById("post-modal-content");s.classList.remove("hidden"),s.classList.add("flex"),document.body.classList.add("overflow-hidden");const e=(await E(`social/posts/${o}?_author=true&_comments=true&_reactions=true`)).data,n=new Date(e.created).toLocaleString("no-NO",{day:"2-digit",month:"2-digit",year:"2-digit",hour:"2-digit",minute:"2-digit"}),a=e.author?.avatar?.url?`<img 
     class="w-14 h-14 rounded-full object-cover" 
     src="${e.author.avatar.url}" 
     alt="post author's profile picture"
   >`:"",l=e.title&&`<h2 class="text-lg font-semibold">${e.title}</h2>`,i=e.body&&`<p class="text-gray-700 leading-relaxed">${e.body}</p>`,c=e.comments.map(d=>`
        
    <div class="border-t pt-2 mt-4">
    <div class="flex items-center gap-4 py-2">
    <img src="${d.author.avatar.url}" class="w-8 h-8 rounded-full" alt="${d.author.name}'s avatar">
      <p class="text-sm font-semibold">${d.author.name}</p>
      </div>
      <p class="text-sm text-gray-700">${d.body}</p>
    </div>
  `).join("")||"<p class='text-sm text-gray-500 border-t pt-2 mt-4'>No comments yet</p>";t.innerHTML=`
  <div class="bg-white rounded-xl shadow-md p-4 w-full max-w-2xl mx-auto space-y-3">

    <div class="flex justify-between items-center">
      <div class="flex items-center gap-2">
        ${a}
        <p class="font-semibold">
          ${e.author.name}
        </p>
      </div>

      <p class="text-xs text-gray-500">${n}</p>
    </div>
    ${l}
    ${i}
    ${e.media?.url?`<img 
            class="w-full rounded-lg object-cover max-h-[500px]" 
            src="${e.media.url}" 
            alt="${e.media?.alt??"Post image"}"
          >`:""}
    <div class="mt-6 space-y-2">
    ${c}
    </div>
  </div>
`}async function j(){if(p()&&b())return`
      <section class="px-4 md:max-w-4xl md:mx-auto">
        <div
          class="bg-white rounded-lg shadow p-4 mb-6 flex flex-col md:flex-row gap-4"
        >
          <textarea
            placeholder="What's on your mind?"
            class="flex-1 border rounded px-3 py-2 h-10 resize-none"
          ></textarea>

          <button
            class="shrink-0 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full md:w-auto"
          >
            Create Post
          </button>
        </div>
      </section>
      <section id="feed">
        <div id="posts"></div>
        <div class="flex justify-between mt-12">
          <button id="prev-page-btn">Previous page</button>
          <button id="next-page-btn">Next page</button>
        </div>
      </section>
      <div
        id="post-modal"
        class="hidden fixed inset-0 items-start justify-center pt-24 z-50"
      >
        <div class="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

        <div
          class="modal-panel bg-white rounded-xl shadow-xl p-4 w-full max-w-2xl relative max-h-[80vh] overflow-y-auto"
        >
          <div class="flex justify-end">
            <button id="modal-close" class="bg-red-500 p-2 text-white rounded">
              Close
            </button>
          </div>

          <div id="post-modal-content"></div>
        </div>
      </div>
    `;window.location.hash="#/login"}let u=1,f=!1;async function w(o){const s=document.getElementById("posts"),t=document.getElementById("next-page-btn");if(!(!s||!t)){f=!0,t.textContent="Loading...",t.disabled=!0;try{const r=await E(`social/posts?page=${o}&limit=15&_author=true`),e=r.data,n=r.meta;s.innerHTML="",e.forEach(a=>{const l=document.createElement("div"),i=document.createElement("h2"),c=document.createElement("p"),d=document.createElement("p"),I=document.createElement("div"),g=document.createElement("div"),h=document.createElement("div"),L=document.createElement("span"),y=document.createElement("div"),B=document.createElement("div"),v=document.createElement("p");l.style.cursor="pointer",l.className="post-card",d.className="text-xs text-gray-500",c.className="post-textarea bg-slate-200",g.className="flex justify-between items-center",h.className="flex items-center gap-2",y.className="w-10 h-10 rounded-full overflow-hidden",v.className="text-sm ml-2 mt-2";const C=a.media?.url;if(C){const m=document.createElement("img");m.src=C,m.alt=a.media?.alt||"Post image",I.append(m)}const $=a.author?.avatar?.url;if($){const m=document.createElement("img");m.src=$,m.alt=`${a.author.name} avatar`,m.className="w-10 h-10 rounded-full",y.append(m)}const k=a.updated,N=new Date(k).toLocaleString("no-NO",{day:"2-digit",month:"2-digit",year:"2-digit",hour:"2-digit",minute:"2-digit"});i.textContent=a.title.charAt(0).toUpperCase()+a.title.slice(1),c.textContent=a.body,d.textContent=N,L.textContent=a.author?.name||"Unknown user",v.textContent=`${a._count.comments} Comments`,l.onclick=()=>{D(a.id)},B.append(v),h.append(y,L),g.append(h,d),l.append(g,i,I,c,B),s.append(l)}),n.isLastPage?t.style.display="none":(t.textContent="Load More",t.disabled=!1)}catch(r){console.error("Failed to fetch posts:",r)}finally{f=!1}}}function _(){const o=document.getElementById("next-page-btn"),s=document.getElementById("prev-page-btn");o.onclick=()=>{f||(u++,w(u))},s.onclick=()=>{f||u<=1||(u--,w(u))}}function F(){return`
    <section class="flex flex-col items-center">
      <h1 class="text-4xl font-bold text-red-400">404</h1>
      <p class="mt-2 text-slate-800">The page does not exist.</p>
      <a
        href="#/"
        class="mt-6 p-2 bg-blue-500 rounded-md text-white hover:bg-blue-600"
      >
        Back to homepage
      </a>
    </section>
  `}function K(){return`
    <section class="px-4 mt-12">
      <div class="max-w-md mx-auto bg-white rounded-lg shadow p-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-4">Log in</h1>

        <form id="loginForm" class="space-y-4">
          <div>
            <label for="email"> Email </label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              autocomplete="email"
              required
            />
          </div>

          <div>
            <label for="password"> Password </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              autocomplete="current-password"
              required
            />
          </div>

          <button type="submit">Log in</button>
          <p id="loginError" class="text-red-500 text-sm hidden"></p>
        </form>

        <p>
          Don't have an account?
          <a href="#/register"> Register </a>
        </p>
      </div>
    </section>
  `}function q(){const o=document.getElementById("loginForm"),s=document.getElementById("email"),t=document.getElementById("password"),r=document.getElementById("loginError");o.addEventListener("submit",async e=>{e.preventDefault(),r.classList.add("hidden"),r.textContent="";try{const n=await x("auth/login",{email:s.value.trim(),password:t.value});if(S(n.data.accessToken),localStorage.setItem("username",n.data.name),!b()){const a=await x("auth/create-api-key",{name:"Social-App"});T(a.data.key)}window.location.hash="#/"}catch(n){r.textContent=n.message,r.classList.remove("hidden")}})}function H(){return`
    <section class="px-4 mt-12">
      <div class="max-w-md mx-auto bg-white rounded-lg shadow p-6">
        <h1 class="text-2xl font-bold text-gray-800 mb-4">Register</h1>

        <form id="registerForm" class="space-y-4">
          <div>
            <label for="name"> Name </label>
            <input id="name" type="text" placeholder="your_username" required />
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="your.name@stud.noroff.no"
              required
            />
          </div>

          <div>
            <label for="password"> Password </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>
          <span id="registerError" class="hidden"></span>
          <button type="submit">Register</button>
        </form>

        <p>Already have an account?</p>
        <a href="#/login">Login</a>
      </div>
    </section>
  `}function R(){const o=document.getElementById("registerForm"),s=document.getElementById("name"),t=document.getElementById("email"),r=document.getElementById("password"),e=document.getElementById("registerError");o.addEventListener("submit",async n=>{n.preventDefault(),e.classList.add("hidden"),e.textContent="";try{await x("auth/register",{name:s.value.trim(),email:t.value.trim(),password:r.value}),window.location.hash="#/login"}catch(a){e.textContent=a.message,e.classList.remove("hidden")}})}function U(){return`
    <section class="flex flex-col items-center">
      <img id="avatar" class="w-24 rounded-full mt-4 mb-8"></img>
      <h1 id="profileWelcome"></h1>
      <div class="flex gap-2 mt-8">
        <p><span id="followers"></span></p>
        <p><span id="following"></span></p>
        <p><span id="posts"></span></p>
      </div>
      <button id="logout"></button>
    </section>
  `}async function V(){const o=localStorage.getItem("username"),t=(await E(`social/profiles/${o}`)).data,r=document.getElementById("profileWelcome"),e=document.getElementById("avatar"),n=document.getElementById("followers"),a=document.getElementById("following"),l=document.getElementById("posts"),i=document.getElementById("logout");p()||(i.style.display="none"),p()&&(r.textContent=`Welcome back ${t.name}`,e.src=t.avatar.url,e.alt="Profile picture",n.textContent=t._count.followers,a.textContent=t._count.following,l.textContent=t._count.posts,i.textContent="Logout",i.addEventListener("click",c=>{localStorage.removeItem("username"),A(),window.location.hash="#/login"}))}function W(){const o={"#/":j,"#/login":K,"#/register":H,"#/profile":U};async function s(){const t=window.location.hash||"#/",r=o[t]||F;document.getElementById("app").innerHTML=await r(),t==="#/login"&&q(),t==="#/profile"&&V(),t==="#/register"&&R(),t==="#/"&&(_(),O(),w(1))}window.addEventListener("hashchange",s),window.addEventListener("load",s)}window.addEventListener("DOMContentLoaded",()=>{W()});
