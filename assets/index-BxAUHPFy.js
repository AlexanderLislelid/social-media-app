(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const r of n.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function s(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(e){if(e.ep)return;e.ep=!0;const n=s(e);fetch(e.href,n)}})();function U(t){localStorage.setItem("token",t)}function k(){return localStorage.getItem("token")}function j(){localStorage.removeItem("token")}function H(t){localStorage.setItem("apiKey",t)}function _(){return localStorage.getItem("apiKey")}const R="https://v2.api.noroff.dev/";async function D(t,o={}){const{body:s,...a}=o,e=_(),n=k(),r={"Content-Type":"application/json"};e&&(r["X-Noroff-API-Key"]=e),n&&(r.Authorization=`Bearer ${n}`);const m={method:s?"POST":"GET",...a,headers:{...r,...a.headers}};s&&(m.body=JSON.stringify(s));try{const l=await fetch(R+t,m);if(l.status===204)return{data:null};const c=await l.text(),d=c?JSON.parse(c):null;if(!l.ok){const p=d?.errors?.[0]?.message||d?.message||"An unknown API error occurred.";throw new Error(p)}return d}catch(l){throw console.error("API Client Error:",l),l}}const N=t=>D(t),T=(t,o)=>D(t,{body:o}),q=(t,o)=>D(t,{method:"PUT",body:o}),F=t=>D(t,{method:"DELETE"});function K(){const t=document.getElementById("post-modal"),o=document.getElementById("modal-close");function s(){t.classList.add("hidden"),document.body.classList.remove("overflow-hidden"),t.classList.remove("flex"),document.getElementById("post-modal-content").innerHTML=""}o.onclick=s}async function W(t){const o=document.getElementById("post-modal"),s=document.getElementById("post-modal-content");o.classList.remove("hidden"),o.classList.add("flex"),document.body.classList.add("overflow-hidden");const e=(await N(`social/posts/${t}?_author=true&_comments=true&_reactions=true`)).data,n=new Date(e.created).toLocaleString("no-NO",{day:"2-digit",month:"2-digit",year:"2-digit",hour:"2-digit",minute:"2-digit"}),r=e.author?.avatar?.url?`<img 
     class="w-14 h-14 rounded-full object-cover border border-slate-700" 
     src="${e.author.avatar.url}" 
     alt="post author's profile picture"
   >`:"",m=e.title&&`<h2 class="text-lg font-semibold text-slate-100">${e.title}</h2>`,l=e.body&&`<p class="text-slate-300 leading-relaxed">${e.body}</p>`,c=e.comments.map(d=>`
    <div class="border-t border-slate-700 pt-2 mt-4">
      <div class="flex items-center gap-4 py-2">
        <img
          src="${d.author.avatar.url}"
          class="w-8 h-8 rounded-full border border-slate-700"
          alt="${d.author.name}'s avatar"
        >
        <p class="text-sm font-semibold text-slate-100">${d.author.name}</p>
      </div>
      <p class="text-sm text-slate-300">${d.body}</p>
    </div>
  `).join("")||"<p class='text-sm text-slate-400 border-t border-slate-700 pt-2 mt-4'>No comments yet</p>";s.innerHTML=`
  <div class="bg-slate-800 border border-slate-700 rounded-xl shadow-md p-4 w-full max-w-2xl mx-auto space-y-3 text-slate-100">

    <div class="flex justify-between items-center">
      <div class="flex items-center gap-2">
        ${r}
        <p class="font-semibold text-slate-100">
          ${e.author.name}
        </p>
      </div>

      <p class="text-xs text-slate-400">${n}</p>
    </div>

    ${m}
    ${l}

    ${e.media?.url?`<img 
            class="w-full rounded-lg object-cover max-h-[500px] border border-slate-700" 
            src="${e.media.url}" 
            alt="${e.media?.alt??"Post image"}"
          >`:""}

    <div class="mt-6 space-y-2">
      ${c}
    </div>
  </div>
`}async function V(){if(k()&&_())return`
      <section class="px-4 max-w-2xl mx-auto mt-6">
        <form
          id="search-form"
          class="bg-slate-800 border border-slate-700 rounded-xl shadow p-3 flex items-center gap-2"
        >
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search posts..."
            class="flex-1 bg-slate-900 border border-slate-700 text-slate-100 placeholder:text-slate-400 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            class="bg-indigo-500 text-white px-3 py-2 text-sm rounded-lg hover:bg-indigo-600 transition-colors"
          >
            Search
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
        class="hidden fixed inset-0  items-start justify-center pt-24 z-50"
      >
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

        <div
          class="modal-panel bg-slate-900/80 border border-slate-700 rounded-xl shadow-xl p-6 w-full max-w-2xl relative max-h-[80vh] overflow-y-auto text-slate-100 backdrop-blur"
        >
          <div class="flex justify-end">
            <button
              id="modal-close"
              class="px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg hover:border-indigo-500 hover:text-indigo-300  text-sm"
            >
              Close
            </button>
          </div>

          <div id="post-modal-content" class="mt-4"></div>
        </div>
      </div>
    `;window.location.hash="#/login"}let y=1,S=!1,M="";async function A(t,o=""){const s=document.getElementById("posts"),a=document.getElementById("next-page-btn");if(!(!s||!a)){S=!0,a.textContent="Loading...",a.disabled=!0;try{let e=`social/posts?page=${t}&limit=10&_author=true&_count=true`;o&&(e=`social/posts/search?q=${encodeURIComponent(o)}&_author=true&_count=true`);const n=await N(e),r=n.data,m=n.meta;s.innerHTML="",r.forEach(l=>{const c=document.createElement("div"),d=document.createElement("h2"),p=document.createElement("p"),i=document.createElement("p"),f=document.createElement("div"),w=document.createElement("div"),E=document.createElement("div"),B=document.createElement("span"),g=document.createElement("div"),x=document.createElement("div"),u=document.createElement("p"),h=document.createElement("div"),I=document.createElement("span"),v=document.createElement("p");c.style.cursor="pointer",c.className="post-card",i.className="text-xs text-slate-400",p.className="post-textarea bg-slate-700 text-slate-100 border border-slate-800 shadow-md text-slate-100",w.className="flex justify-between items-center text-slate-400",E.className="flex items-center gap-2",g.className="w-10 h-10 rounded-full overflow-hidden",u.className="text-sm text-slate-400 ml-2 mt-2",v.className="text-sm text-slate-400",x.className="flex justify-between",h.className="flex items-center gap-1 text-sm text-slate-400 ml-2 mt-2";const L=l.media?.url;if(L){const b=document.createElement("img");b.src=L,b.alt="Post image",f.append(b)}const C=l.author?.avatar?.url;if(C){const b=document.createElement("img");b.src=C,b.alt=`${l.author.name} avatar`,b.className="w-10 h-10 rounded-full",g.append(b)}I.innerHTML=`
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
       stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-slate-400">
    <path stroke-linecap="round" stroke-linejoin="round"
      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
  </svg>`;const $=l.updated,P=new Date($).toLocaleString("no-NO",{day:"2-digit",month:"2-digit",year:"2-digit",hour:"2-digit",minute:"2-digit"});d.textContent=l.title.charAt(0).toUpperCase()+l.title.slice(1),p.textContent=l.body,i.textContent=P,B.textContent=l.author?.name||"Unknown user",u.textContent=`${l._count.comments} Comments`,v.textContent=l._count.reactions,c.onclick=()=>{W(l.id)},h.append(v,I),x.append(u,h),E.append(g,B),w.append(E,i),c.append(w,d,f,p,x),s.append(c)}),m.isLastPage?a.style.display="none":(a.textContent="Next Page",a.disabled=!1)}catch(e){console.error("Failed to fetch posts:",e),alert(e)}finally{S=!1}}}function z(){const t=document.getElementById("next-page-btn"),o=document.getElementById("prev-page-btn");t.onclick=()=>{S||(y++,A(y,M),window.scrollTo(0,0))},o.onclick=()=>{S||y<=1||(y--,A(y,M),window.scrollTo(0,0))}}function J(){const t=document.getElementById("search-form"),o=document.getElementById("search");t.addEventListener("submit",s=>{s.preventDefault(),M=o.value.trim(),y=1,A(y,M),window.scrollTo(0,0)})}function G(){return`
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
  `}function X(){return`
    <section class="px-4 mt-12">
      <div
        class="max-w-md mx-auto bg-slate-800 border border-slate-700 rounded-xl shadow p-6 space-y-6"
      >
        <h1 class="text-2xl font-bold text-slate-100 text-center">Log in</h1>

        <form id="loginForm" class="space-y-4">
          <div class="flex flex-col gap-1">
            <label for="email" class="text-sm text-slate-300 ml-1">Email</label>
            <input
              id="email"
              type="email"
              placeholder="your.name@stud.noroff.no"
              autocomplete="email"
              required
              class="bg-slate-900 border border-slate-700 text-slate-100 placeholder:text-slate-400 rounded-lg px-3 py-2 text-sm outline-none focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div class="flex flex-col gap-1">
            <label for="password" class="text-sm text-slate-300 ml-1"
              >Password</label
            >
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              autocomplete="current-password"
              required
              class="bg-slate-900 border border-slate-700 text-slate-100 placeholder:text-slate-400 rounded-lg px-3 py-2 text-sm outline-none focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            class="w-full bg-indigo-500 text-white px-3 py-2 text-sm rounded-lg hover:bg-indigo-600 font-medium"
          >
            Log in
          </button>

          <p id="loginError" class="text-red-400 text-sm hidden"></p>
        </form>

        <p class="text-sm text-slate-400 text-center">
          Don't have an account?
          <a
            href="#/register"
            class="text-indigo-400 hover:text-indigo-300 font-medium "
          >
            Register
          </a>
        </p>
      </div>
    </section>
  `}function Z(){const t=document.getElementById("loginForm"),o=document.getElementById("email"),s=document.getElementById("password"),a=document.getElementById("loginError");t.addEventListener("submit",async e=>{e.preventDefault(),a.classList.add("hidden"),a.textContent="";try{const n=await T("auth/login",{email:o.value.trim(),password:s.value});if(U(n.data.accessToken),localStorage.setItem("username",n.data.name),!_()){const r=await T("auth/create-api-key",{name:"Social-App"});H(r.data.key)}window.location.hash="#/"}catch(n){a.textContent=n.message,a.classList.remove("hidden")}})}function Q(){return`
    <section class="px-4 mt-12">
      <div
        class="max-w-md mx-auto bg-slate-800 border border-slate-700 rounded-xl shadow p-6 space-y-6"
      >
        <h1 class="text-2xl font-bold text-slate-100 text-center">Register</h1>

        <form id="registerForm" class="space-y-4">
          <div class="flex flex-col gap-1">
            <label for="name" class="text-sm text-slate-300">Name</label>
            <input
              id="name"
              type="text"
              placeholder="your_username"
              required
              class="bg-slate-900 border border-slate-700 text-slate-100 placeholder:text-slate-400 rounded-lg px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div class="flex flex-col gap-1">
            <label for="email" class="text-sm text-slate-300">Email</label>
            <input
              id="email"
              type="email"
              placeholder="your.name@stud.noroff.no"
              required
              class="bg-slate-900 border border-slate-700 text-slate-100 placeholder:text-slate-400 rounded-lg px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div class="flex flex-col gap-1">
            <label for="password" class="text-sm text-slate-300"
              >Password</label
            >
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              required
              class="bg-slate-900 border border-slate-700 text-slate-100 placeholder:text-slate-400 
              rounded-lg px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <span id="registerError" class="text-red-400 text-sm hidden"></span>

          <button
            type="submit"
            class="w-full bg-indigo-500 text-white px-3 py-2 text-sm rounded-lg hover:bg-indigo-600 font-medium"
          >
            Register
          </button>
        </form>

        <p class="text-sm text-slate-400 text-center">
          Already have an account?
          <a
            href="#/login"
            class="text-indigo-400 hover:text-indigo-300 font-medium"
          >
            Login
          </a>
        </p>
      </div>
    </section>
  `}function Y(){const t=document.getElementById("registerForm"),o=document.getElementById("name"),s=document.getElementById("email"),a=document.getElementById("password"),e=document.getElementById("registerError");t.addEventListener("submit",async n=>{n.preventDefault(),e.classList.add("hidden"),e.textContent="";try{await T("auth/register",{name:o.value.trim(),email:s.value.trim(),password:a.value}),window.location.hash="#/login"}catch(r){e.textContent=r.message,e.classList.remove("hidden")}})}function ee(){return`
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
      
  `}async function O(){const t=localStorage.getItem("username"),o=await N(`social/profiles/${t}`),s=await N(`social/profiles/${t}/posts?_author=true&_count=true`),a=o.data,e=s.data;console.log(e);const n=document.getElementById("profileWelcome"),r=document.getElementById("avatar"),m=document.getElementById("followers"),l=document.getElementById("following"),c=document.getElementById("number-of-posts"),d=document.getElementById("logout");if(k()||(d.style.display="none"),k()){n.textContent=`Welcome back ${a.name}`,r.src=a.avatar.url,r.alt="Profile picture",m.textContent=a._count.followers,l.textContent=a._count.following,c.textContent=a._count.posts;const p=document.getElementById("posts");p.innerHTML="",e.forEach(i=>{const f=document.createElement("div"),w=document.createElement("h2"),E=document.createElement("p"),B=document.createElement("div"),g=document.createElement("button"),x=document.createElement("button"),u=document.createElement("dialog"),h=document.createElement("input"),I=document.createElement("input"),v=document.createElement("button"),L=document.createElement("button"),C=document.createElement("label"),$=document.createElement("label");if(C.textContent="Title",$.textContent="Body",w.textContent=i.title,E.textContent=i.body,g.textContent="Delete post",x.textContent="Update Post",v.textContent="Update..",L.textContent="Close",g.className="p-2 bg-red-500 text-white rounded mr-4",x.className="p-2 bg-blue-500 text-white rounded",f.append(w),i.media?.url){const P=document.createElement("img");P.src=i.media.url,P.alt="Post image",f.append(P)}u.append(C,h,$,I,v,L),f.append(u),f.append(E),B.append(g,x),p.append(f,B),g.addEventListener("click",async()=>{await F(`social/posts/${i.id}`),O()}),x.addEventListener("click",()=>{h.value=i.title,I.value=i.body,u.showModal()}),v.addEventListener("click",async()=>{await q(`social/posts/${i.id}`,{title:h.value,body:I.value}),u.close(),O()}),L.addEventListener("click",()=>{u.close()})}),d.textContent="Logout",d.addEventListener("click",i=>{localStorage.removeItem("username"),j(),window.location.hash="#/login"})}}async function te(){if(k()&&_())return`
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
    `;window.location.hash="#/login"}function oe(){const t=document.getElementById("create-form"),o=document.getElementById("post-title"),s=document.getElementById("post-content"),a=document.getElementById("post-media-url");t.addEventListener("submit",async e=>{e.preventDefault();const n=o.value.trim(),r=s.value.trim(),m=a.value.trim(),l={title:n,body:r};m&&(l.media={url:m,alt:n||"Post image"});try{await T("social/posts",l),window.location.hash="#/"}catch(c){console.error(c),alert(c.message)}})}function ne(){const t={"#/":V,"#/login":X,"#/register":Q,"#/profile":ee,"#/create":te};async function o(){const s=window.location.hash||"#/",a=t[s]||G;document.getElementById("app").innerHTML=await a(),s==="#/login"&&Z(),s==="#/profile"&&O(),s==="#/register"&&Y(),s==="#/"&&(z(),J(),K(),A(1,"")),s==="#/create"&&oe()}window.addEventListener("hashchange",o),window.addEventListener("load",o)}window.addEventListener("DOMContentLoaded",()=>{ne()});
