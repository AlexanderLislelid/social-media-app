(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const r of e.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function a(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function n(t){if(t.ep)return;t.ep=!0;const e=a(t);fetch(t.href,e)}})();function j(o){localStorage.setItem("token",o)}function k(){return localStorage.getItem("token")}function F(){localStorage.removeItem("token")}function H(o){localStorage.setItem("apiKey",o)}function _(){return localStorage.getItem("apiKey")}const R="https://v2.api.noroff.dev/";async function D(o,s={}){const{body:a,...n}=s,t=_(),e=k(),r={"Content-Type":"application/json"};t&&(r["X-Noroff-API-Key"]=t),e&&(r.Authorization=`Bearer ${e}`);const u={method:a?"POST":"GET",...n,headers:{...r,...n.headers}};a&&(u.body=JSON.stringify(a));try{const l=await fetch(R+o,u);if(l.status===204)return{data:null};const i=await l.text(),m=i?JSON.parse(i):null;if(!l.ok){const c=m?.errors?.[0]?.message||m?.message||"An unknown API error occurred.";throw new Error(c)}return m}catch(l){throw console.error("API Client Error:",l),l}}const N=o=>D(o),T=(o,s)=>D(o,{body:s}),U=(o,s)=>D(o,{method:"PUT",body:s}),q=o=>D(o,{method:"DELETE"});function K(){const o=document.getElementById("post-modal"),s=document.getElementById("modal-close");function a(){o.classList.add("hidden"),document.body.classList.remove("overflow-hidden"),o.classList.remove("flex"),document.getElementById("post-modal-content").innerHTML=""}s.onclick=a}async function W(o){const s=document.getElementById("post-modal"),a=document.getElementById("post-modal-content"),n=document.getElementById("follow-user-btn");s.classList.remove("hidden"),s.classList.add("flex"),document.body.classList.add("overflow-hidden");const e=(await N(`social/posts/${o}?_author=true&_comments=true&_reactions=true`)).data;n.onclick=async()=>{try{await U(`social/profiles/${e.author.name}/follow`),n.textContent="Following"}catch(c){alert(c.message)}n.textContent="Follow user"};const r=new Date(e.created).toLocaleString("no-NO",{day:"2-digit",month:"2-digit",year:"2-digit",hour:"2-digit",minute:"2-digit"}),u=e.author?.avatar?.url?`<img 
     class="w-14 h-14 rounded-full object-cover border border-slate-700" 
     src="${e.author.avatar.url}" 
     alt="post author's profile picture"
   >`:"",l=e.title&&`<h2 class="text-lg font-semibold text-slate-100">${e.title}</h2>`,i=e.body&&`<p class="text-slate-300 leading-relaxed">${e.body}</p>`,m=e.comments.map(c=>`
    <div class="border-t border-slate-700 pt-2 mt-4">
      <div class="flex items-center gap-4 py-2">
        <img
          src="${c.author.avatar.url}"
          class="w-8 h-8 rounded-full border border-slate-700"
          alt="${c.author.name}'s avatar"
        >
        <p class="text-sm font-semibold text-slate-100">${c.author.name}</p>
      </div>
      <p class="text-sm text-slate-300">${c.body}</p>
    </div>
  `).join("")||"<p class='text-sm text-slate-400 border-t border-slate-700 pt-2 mt-4'>No comments yet</p>";a.innerHTML=`
  <div class="bg-slate-800 border border-slate-700 rounded-xl shadow-md p-4 w-full max-w-2xl mx-auto space-y-3 text-slate-100">

    <div class="flex justify-between items-center">
      <div class="flex items-center gap-2">
        ${u}
        <p class="font-semibold text-slate-100">
          ${e.author.name}
        </p>
      </div>

      <p class="text-xs text-slate-400">${r}</p>
    </div>

    ${l}
    ${i}

    ${e.media?.url?`<img 
            class="w-full rounded-lg object-cover max-h-[500px] border border-slate-700" 
            src="${e.media.url}" 
            alt="${e.media?.alt??"Post image"}"
          >`:""}

    <div class="mt-6 space-y-2">
      ${m}
    </div>
  </div>
`}async function V(){if(k()&&_())return`
      <section class="max-w-[500px] mx-auto mt-6">
        <form
          id="search-form"
          class="bg-slate-800 border border-slate-700 rounded-xl shadow p-3 flex flex-col sm:flex-row sm:items-center gap-2"
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
            class="bg-indigo-500 text-white px-3 py-2 text-sm rounded-lg hover:bg-indigo-600 transition-colors w-full sm:w-auto"
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
          <div class="flex justify-between">
            <button
              id="follow-user-btn"
              class="bg-indigo-500 text-white px-3 py-2 text-sm rounded-lg hover:bg-indigo-600 transition-colors "
            >
              Follow user
            </button>
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
    `;window.location.hash="#/login"}let v=1,S=!1,M="";async function A(o,s=""){const a=document.getElementById("posts"),n=document.getElementById("next-page-btn");if(!(!a||!n)){S=!0,n.textContent="Loading...",n.disabled=!0;try{let t=`social/posts?page=${o}&limit=10&_author=true&_count=true`;s&&(t=`social/posts/search?q=${encodeURIComponent(s)}&_author=true&_count=true`);const e=await N(t),r=e.data,u=e.meta;a.innerHTML="",r.forEach(l=>{const i=document.createElement("div"),m=document.createElement("h2"),c=document.createElement("p"),d=document.createElement("p"),f=document.createElement("div"),w=document.createElement("div"),E=document.createElement("div"),L=document.createElement("span"),g=document.createElement("div"),x=document.createElement("div"),p=document.createElement("p"),h=document.createElement("div"),I=document.createElement("span"),y=document.createElement("p");i.style.cursor="pointer",i.className="post-card",d.className="text-xs text-slate-400",c.className="post-textarea bg-slate-700 text-slate-100 border border-slate-800 shadow-md",w.className="flex justify-between items-center text-slate-400",E.className="flex items-center gap-2",g.className="w-10 h-10 rounded-full overflow-hidden",p.className="text-sm text-slate-400 ml-2 mt-2",y.className="text-sm text-slate-400",x.className="flex justify-between",h.className="flex items-center gap-1 text-sm text-slate-400 ml-2 mt-2";const B=l.media?.url;if(B){const b=document.createElement("img");b.src=B,b.alt="Post image",f.append(b)}const C=l.author?.avatar?.url;if(C){const b=document.createElement("img");b.src=C,b.alt=`${l.author.name} avatar`,b.className="w-10 h-10 rounded-full",g.append(b)}I.innerHTML=`
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
       stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-slate-400">
    <path stroke-linecap="round" stroke-linejoin="round"
      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
  </svg>`;const $=l.updated,P=new Date($).toLocaleString("no-NO",{day:"2-digit",month:"2-digit",year:"2-digit",hour:"2-digit",minute:"2-digit"});m.textContent=l.title.charAt(0).toUpperCase()+l.title.slice(1),c.textContent=l.body,d.textContent=P,L.textContent=l.author?.name||"Unknown user",p.textContent=`${l._count.comments} Comments`,y.textContent=l._count.reactions,i.onclick=()=>{W(l.id)},h.append(y,I),x.append(p,h),E.append(g,L),w.append(E,d),i.append(w,m,f,c,x),a.append(i)}),u.isLastPage?n.style.display="none":(n.textContent="Next Page",n.disabled=!1)}catch(t){console.error("Failed to fetch posts:",t),alert(t)}finally{S=!1}}}function z(){const o=document.getElementById("next-page-btn"),s=document.getElementById("prev-page-btn");o.onclick=()=>{S||(v++,A(v,M),window.scrollTo(0,0))},s.onclick=()=>{S||v<=1||(v--,A(v,M),window.scrollTo(0,0))}}function J(){const o=document.getElementById("search-form"),s=document.getElementById("search");o.addEventListener("submit",a=>{a.preventDefault(),M=s.value.trim(),v=1,A(v,M),window.scrollTo(0,0)})}function G(){return`
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
  `}function Z(){const o=document.getElementById("loginForm"),s=document.getElementById("email"),a=document.getElementById("password"),n=document.getElementById("loginError");o.addEventListener("submit",async t=>{t.preventDefault(),n.classList.add("hidden"),n.textContent="";try{const e=await T("auth/login",{email:s.value.trim(),password:a.value});if(j(e.data.accessToken),localStorage.setItem("username",e.data.name),!_()){const r=await T("auth/create-api-key",{name:"Social-App"});H(r.data.key)}window.location.hash="#/"}catch(e){n.textContent=e.message,n.classList.remove("hidden")}})}function Q(){return`
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
  `}function Y(){const o=document.getElementById("registerForm"),s=document.getElementById("name"),a=document.getElementById("email"),n=document.getElementById("password"),t=document.getElementById("registerError");o.addEventListener("submit",async e=>{e.preventDefault(),t.classList.add("hidden"),t.textContent="";try{await T("auth/register",{name:s.value.trim(),email:a.value.trim(),password:n.value}),window.location.hash="#/login"}catch(r){t.textContent=r.message,t.classList.remove("hidden")}})}function ee(){return`
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
      
  `}async function O(){const o=localStorage.getItem("username"),s=await N(`social/profiles/${o}`),a=await N(`social/profiles/${o}/posts?_author=true&_count=true`),n=s.data,t=a.data;console.log(t);const e=document.getElementById("profileWelcome"),r=document.getElementById("avatar"),u=document.getElementById("followers"),l=document.getElementById("following"),i=document.getElementById("number-of-posts"),m=document.getElementById("logout");if(k()||(m.style.display="none"),k()){e.textContent=`Welcome back ${n.name}`,r.src=n.avatar.url,r.alt="Profile picture",u.textContent=n._count.followers,l.textContent=n._count.following,i.textContent=n._count.posts;const c=document.getElementById("posts");c.innerHTML="",t.forEach(d=>{const f=document.createElement("div"),w=document.createElement("h2"),E=document.createElement("p"),L=document.createElement("div"),g=document.createElement("button"),x=document.createElement("button"),p=document.createElement("dialog"),h=document.createElement("input"),I=document.createElement("input"),y=document.createElement("button"),B=document.createElement("button"),C=document.createElement("label"),$=document.createElement("label");if(C.textContent="Title",$.textContent="Body",w.textContent=d.title,E.textContent=d.body,g.textContent="Delete post",x.textContent="Update Post",y.textContent="Update..",B.textContent="Close",g.className="p-2 bg-red-500 text-white rounded mr-4",x.className="p-2 bg-blue-500 text-white rounded",f.append(w),d.media?.url){const P=document.createElement("img");P.src=d.media.url,P.alt="Post image",f.append(P)}p.append(C,h,$,I,y,B),f.append(p),f.append(E),L.append(g,x),c.append(f,L),g.addEventListener("click",async()=>{await q(`social/posts/${d.id}`),O()}),x.addEventListener("click",()=>{h.value=d.title,I.value=d.body,p.showModal()}),y.addEventListener("click",async()=>{await U(`social/posts/${d.id}`,{title:h.value,body:I.value}),p.close(),O()}),B.addEventListener("click",()=>{p.close()})}),m.textContent="Logout",m.addEventListener("click",d=>{localStorage.removeItem("username"),F(),window.location.hash="#/login"})}}async function te(){if(k()&&_())return`
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
    `;window.location.hash="#/login"}function oe(){const o=document.getElementById("create-form"),s=document.getElementById("post-title"),a=document.getElementById("post-content"),n=document.getElementById("post-media-url");o.addEventListener("submit",async t=>{t.preventDefault();const e=s.value.trim(),r=a.value.trim(),u=n.value.trim(),l={title:e,body:r};u&&(l.media={url:u,alt:e||"Post image"});try{await T("social/posts",l),window.location.hash="#/"}catch(i){console.error(i),alert(i.message)}})}function ne(){const o={"#/":V,"#/login":X,"#/register":Q,"#/profile":ee,"#/create":te};async function s(){const a=window.location.hash||"#/",n=o[a]||G;document.getElementById("app").innerHTML=await n(),a==="#/login"&&Z(),a==="#/profile"&&O(),a==="#/register"&&Y(),a==="#/"&&(z(),J(),K(),A(1,"")),a==="#/create"&&oe()}window.addEventListener("hashchange",s),window.addEventListener("load",s)}window.addEventListener("DOMContentLoaded",()=>{ne()});
