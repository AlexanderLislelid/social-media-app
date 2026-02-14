(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function a(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=a(e);fetch(e.href,o)}})();function j(t){localStorage.setItem("token",t)}function E(){return localStorage.getItem("token")}function U(){localStorage.removeItem("token")}function H(t){localStorage.setItem("apiKey",t)}function N(){return localStorage.getItem("apiKey")}const R="https://v2.api.noroff.dev/";async function S(t,n={}){const{body:a,...s}=n,e=N(),o=E(),i={"Content-Type":"application/json"};e&&(i["X-Noroff-API-Key"]=e),o&&(i.Authorization=`Bearer ${o}`);const d={method:a?"POST":"GET",...s,headers:{...i,...s.headers}};a&&(d.body=JSON.stringify(a));try{const r=await fetch(R+t,d);if(r.status===204)return{data:null};const l=await r.text(),c=l?JSON.parse(l):null;if(!r.ok){const h=c?.errors?.[0]?.message||c?.message||"An unknown API error occurred.";throw new Error(h)}return c}catch(r){throw console.error("API Client Error:",r),r}}const B=t=>S(t),L=(t,n)=>S(t,{body:n}),q=t=>S(t,{method:"DELETE"});function F(){const t=document.getElementById("post-modal"),n=document.getElementById("modal-close");function a(){t.classList.add("hidden"),document.body.classList.remove("overflow-hidden"),t.classList.remove("flex"),document.getElementById("post-modal-content").innerHTML=""}n.onclick=a}async function K(t){const n=document.getElementById("post-modal"),a=document.getElementById("post-modal-content");n.classList.remove("hidden"),n.classList.add("flex"),document.body.classList.add("overflow-hidden");const e=(await B(`social/posts/${t}?_author=true&_comments=true&_reactions=true`)).data,o=new Date(e.created).toLocaleString("no-NO",{day:"2-digit",month:"2-digit",year:"2-digit",hour:"2-digit",minute:"2-digit"}),i=e.author?.avatar?.url?`<img 
     class="w-14 h-14 rounded-full object-cover" 
     src="${e.author.avatar.url}" 
     alt="post author's profile picture"
   >`:"",d=e.title&&`<h2 class="text-lg font-semibold">${e.title}</h2>`,r=e.body&&`<p class="text-gray-700 leading-relaxed">${e.body}</p>`,l=e.comments.map(c=>`
        
    <div class="border-t pt-2 mt-4">
    <div class="flex items-center gap-4 py-2">
    <img src="${c.author.avatar.url}" class="w-8 h-8 rounded-full" alt="${c.author.name}'s avatar">
      <p class="text-sm font-semibold">${c.author.name}</p>
      </div>
      <p class="text-sm text-gray-700">${c.body}</p>
    </div>
  `).join("")||"<p class='text-sm text-gray-500 border-t pt-2 mt-4'>No comments yet</p>";a.innerHTML=`
  <div class="bg-white rounded-xl shadow-md p-4 w-full max-w-2xl mx-auto space-y-3">

    <div class="flex justify-between items-center">
      <div class="flex items-center gap-2">
        ${i}
        <p class="font-semibold">
          ${e.author.name}
        </p>
      </div>

      <p class="text-xs text-gray-500">${o}</p>
    </div>
    ${d}
    ${r}
    ${e.media?.url?`<img 
            class="w-full rounded-lg object-cover max-h-[500px]" 
            src="${e.media.url}" 
            alt="${e.media?.alt??"Post image"}"
          >`:""}
    <div class="mt-6 space-y-2">
    ${l}
    </div>
  </div>
`}async function W(){if(E()&&N())return`
      <section class="px-4 md:max-w-4xl md:mx-auto">
        <form
          id="search-form"
          class="bg-white rounded-lg shadow p-4 mb-6 flex flex-col md:flex-row gap-4"
        >
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search for posts"
            class="flex-1 border rounded px-3 py-2 h-10 resize-none"
          />

          <button
            type="submit"
            class="shrink-0 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full md:w-auto"
          >
            Search posts
          </button>
        </form>
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
    `;window.location.hash="#/login"}let v=1,C=!1,P="";async function k(t,n=""){const a=document.getElementById("posts"),s=document.getElementById("next-page-btn");if(!(!a||!s)){C=!0,s.textContent="Loading...",s.disabled=!0;try{let e=`social/posts?page=${t}&limit=10&_author=true&_count=true`;n&&(e=`social/posts/search?q=${encodeURIComponent(n)}&_author=true&_count=true`);const o=await B(e),i=o.data,d=o.meta;a.innerHTML="",i.forEach(r=>{const l=document.createElement("div"),c=document.createElement("h2"),h=document.createElement("p"),m=document.createElement("p"),I=document.createElement("div"),u=document.createElement("div"),x=document.createElement("div"),b=document.createElement("span"),w=document.createElement("div"),p=document.createElement("div"),f=document.createElement("p"),y=document.createElement("div"),T=document.createElement("span"),$=document.createElement("p");l.style.cursor="pointer",l.className="post-card",m.className="text-xs text-gray-500",h.className="post-textarea bg-slate-200",u.className="flex justify-between items-center",x.className="flex items-center gap-2",w.className="w-10 h-10 rounded-full overflow-hidden",f.className="text-sm ml-2 mt-2",$.className="text-sm",p.className="flex justify-between",y.className="flex items-center gap-1 text-sm ml-2 mt-2";const A=r.media?.url;if(A){const g=document.createElement("img");g.src=A,g.alt="Post image",I.append(g)}const _=r.author?.avatar?.url;if(_){const g=document.createElement("img");g.src=_,g.alt=`${r.author.name} avatar`,g.className="w-10 h-10 rounded-full",w.append(g)}T.innerHTML=`
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
       stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-gray-800">
    <path stroke-linecap="round" stroke-linejoin="round"
      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
  </svg>`;const M=r.updated,O=new Date(M).toLocaleString("no-NO",{day:"2-digit",month:"2-digit",year:"2-digit",hour:"2-digit",minute:"2-digit"});c.textContent=r.title.charAt(0).toUpperCase()+r.title.slice(1),h.textContent=r.body,m.textContent=O,b.textContent=r.author?.name||"Unknown user",f.textContent=`${r._count.comments} Comments`,$.textContent=r._count.reactions,l.onclick=()=>{K(r.id)},y.append($,T),p.append(f,y),x.append(w,b),u.append(x,m),l.append(u,c,I,h,p),a.append(l)}),d.isLastPage?s.style.display="none":(s.textContent="Next Page",s.disabled=!1)}catch(e){console.error("Failed to fetch posts:",e),alert(e)}finally{C=!1}}}function V(){const t=document.getElementById("next-page-btn"),n=document.getElementById("prev-page-btn");t.onclick=()=>{C||(v++,k(v,P),window.scrollTo(0,0))},n.onclick=()=>{C||v<=1||(v--,k(v,P),window.scrollTo(0,0))}}function z(){const t=document.getElementById("search-form"),n=document.getElementById("search");t.addEventListener("submit",a=>{a.preventDefault(),P=n.value.trim(),v=1,k(v,P),window.scrollTo(0,0)})}function J(){return`
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
  `}function G(){return`
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
  `}function X(){const t=document.getElementById("loginForm"),n=document.getElementById("email"),a=document.getElementById("password"),s=document.getElementById("loginError");t.addEventListener("submit",async e=>{e.preventDefault(),s.classList.add("hidden"),s.textContent="";try{const o=await L("auth/login",{email:n.value.trim(),password:a.value});if(j(o.data.accessToken),localStorage.setItem("username",o.data.name),!N()){const i=await L("auth/create-api-key",{name:"Social-App"});H(i.data.key)}window.location.hash="#/"}catch(o){s.textContent=o.message,s.classList.remove("hidden")}})}function Z(){return`
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
  `}function Q(){const t=document.getElementById("registerForm"),n=document.getElementById("name"),a=document.getElementById("email"),s=document.getElementById("password"),e=document.getElementById("registerError");t.addEventListener("submit",async o=>{o.preventDefault(),e.classList.add("hidden"),e.textContent="";try{await L("auth/register",{name:n.value.trim(),email:a.value.trim(),password:s.value}),window.location.hash="#/login"}catch(i){e.textContent=i.message,e.classList.remove("hidden")}})}function Y(){return`
    <section class="flex flex-col items-center">
      <img id="avatar" class="w-24 rounded-full mt-4 mb-8"></img>
      <h1 id="profileWelcome"></h1>
      <div class="flex gap-2 mt-8">
        <p><span id="followers"></span></p>
        <p><span id="following"></span></p>
        <p><span id="number-of-posts"></span></p>
      </div>
      
      <button id="logout"></button>
    </section>

      <div id="posts" class="mt-20 flex flex-col gap-12 items-center"></div>
      
  `}async function D(){const t=localStorage.getItem("username"),n=await B(`social/profiles/${t}`),a=await B(`social/profiles/${t}/posts?_author=true&_count=true`),s=n.data,e=a.data;console.log(e);const o=document.getElementById("profileWelcome"),i=document.getElementById("avatar"),d=document.getElementById("followers"),r=document.getElementById("following"),l=document.getElementById("number-of-posts"),c=document.getElementById("logout");if(E()||(c.style.display="none"),E()){o.textContent=`Welcome back ${s.name}`,i.src=s.avatar.url,i.alt="Profile picture",d.textContent=s._count.followers,r.textContent=s._count.following,l.textContent=s._count.posts;const h=document.getElementById("posts");h.innerHTML="",e.forEach(m=>{const I=document.getElementById("posts"),u=document.createElement("div"),x=document.createElement("h2"),b=document.createElement("p"),w=document.createElement("div"),p=document.createElement("button"),f=document.createElement("button");if(x.textContent=m.title,b.textContent=m.body,p.textContent="Delete post",f.textContent="Update Post",p.className="p-2 bg-red-500 text-white rounded mr-4",f.className="p-2 bg-blue-500 text-white rounded",u.append(x),m.media?.url){const y=document.createElement("img");y.src=m.media.url,y.alt="Post image",u.append(y)}u.append(b),w.append(p,f),I.append(u,w),p.addEventListener("click",async()=>{await q(`social/posts/${m.id}`),D()}),f.addEventListener("click",async()=>{})}),c.textContent="Logout",c.addEventListener("click",m=>{localStorage.removeItem("username"),U(),window.location.hash="#/login"})}}async function ee(){if(E()&&N())return`
      <h1 class="text-center text-2xl font-bold">
        Create your first socialApp post
      </h1>
      <form id="create-form" class="flex flex-col gap-4">
        <div>
          <label for="post-title">Title</label>
          <input type="textarea" id="post-title" />
        </div>
        <div>
          <label for="post-content">Body</label>
          <input type="textarea" id="post-content" />
        </div>
        <div>
          <label for="post-media-url">Image URL</label>
          <input type="textarea" id="post-media-url" />
        </div>
        <button type="submit">Create Post</button>
      </form>
    `;window.location.hash="#/login"}function te(){const t=document.getElementById("create-form"),n=document.getElementById("post-title"),a=document.getElementById("post-content"),s=document.getElementById("post-media-url");t.addEventListener("submit",async e=>{e.preventDefault();const o=n.value.trim(),i=a.value.trim(),d=s.value.trim(),r={title:o,body:i};d&&(r.media={url:d,alt:o||"Post image"});try{await L("social/posts",r),window.location.hash="#/"}catch(l){console.error(l),alert(l.message)}})}function oe(){const t={"#/":W,"#/login":G,"#/register":Z,"#/profile":Y,"#/create":ee};async function n(){const a=window.location.hash||"#/",s=t[a]||J;document.getElementById("app").innerHTML=await s(),a==="#/login"&&X(),a==="#/profile"&&D(),a==="#/register"&&Q(),a==="#/"&&(V(),z(),F(),k(1,"")),a==="#/create"&&te()}window.addEventListener("hashchange",n),window.addEventListener("load",n)}window.addEventListener("DOMContentLoaded",()=>{oe()});
