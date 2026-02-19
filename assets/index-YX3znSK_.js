(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function s(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(o){if(o.ep)return;o.ep=!0;const n=s(o);fetch(o.href,n)}})();function K(e){localStorage.setItem("token",e)}function A(){return localStorage.getItem("token")}function Z(){localStorage.removeItem("token")}function z(e){localStorage.setItem("apiKey",e)}function _(){return localStorage.getItem("apiKey")}const q="https://v2.api.noroff.dev/";async function H(e,t={}){const{body:s,...a}=t,o=_(),n=A(),l={"Content-Type":"application/json"};o&&(l["X-Noroff-API-Key"]=o),n&&(l.Authorization=`Bearer ${n}`);const d={method:s?"POST":"GET",...a,headers:{...l,...a.headers}};s&&(d.body=JSON.stringify(s));try{const r=await fetch(q+e,d);if(r.status===204)return{data:null};const m=await r.text(),p=m?JSON.parse(m):null;if(!r.ok){const g=p?.errors?.[0]?.message||p?.message||"An unknown API error occurred.";throw new Error(g)}return p}catch(r){throw console.error("API Client Error:",r),r}}const N=e=>H(e),M=(e,t)=>H(e,{body:t}),D=(e,t)=>H(e,{method:"PUT",body:t}),G=e=>H(e,{method:"DELETE"});function J(){const e=document.createElement("span");return e.innerHTML=`
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
      stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-slate-400">
      <path stroke-linecap="round" stroke-linejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
  `,e}function X(){const e=document.createElement("span");return e.innerHTML=`
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>
  `,e}function F(){const e=document.createElement("span");return e.innerHTML=`
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
</svg>
`,e}function W(){const e=document.createElement("span");return e.innerHTML=`
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
</svg>
`,e}function R(e="button",t="primary"){const s=document.createElement("button"),a="px-3 py-2 text-sm rounded-lg",o={primary:"bg-indigo-500 hover:bg-indigo-600 text-white font-medium",danger:"bg-red-600 hover:bg-red-700 text-white font-medium",logout:" bg-slate-900 hover:bg-slate-950 border border-slate-600 text-white font-medium",close:"bg-slate-900 border border-slate-700  hover:border-indigo-500 hover:text-indigo-300",profile:"bg-slate-900 border border-slate-700  hover:border-indigo-500 hover:text-indigo-300 px-2 py-1"};return s.className=`${a} ${o[t]}`.trim(),s.textContent=e,s}function Q(){const e=document.getElementById("post-modal"),t=document.getElementById("modal-close");function s(){e.classList.add("hidden"),document.body.classList.remove("overflow-hidden"),e.classList.remove("flex"),document.getElementById("post-modal-content").innerHTML=""}document.addEventListener("keydown",a=>{a.key==="Escape"&&s()}),t.onclick=s}async function Y(e){const t=document.getElementById("post-modal"),s=document.getElementById("post-modal-content"),a=document.getElementById("btn-wrapper");a.innerHTML="",t.classList.remove("hidden"),t.classList.add("flex"),document.body.classList.add("overflow-hidden");const n=(await N(`social/posts/${e}?_author=true&_comments=true&_reactions=true`)).data,l=new Date(n.created).toLocaleString("no-NO",{day:"2-digit",month:"2-digit",year:"2-digit",hour:"2-digit",minute:"2-digit"}),d=document.createElement("div"),r=document.createElement("div"),m=document.createElement("div"),p=document.createElement("p"),g=document.createElement("h2"),f=document.createElement("p"),u=document.createElement("p");if(d.className="bg-slate-800 border border-slate-700 rounded-xl shadow-md p-4 w-full max-w-2xl mx-auto space-y-3 text-slate-100",r.className="flex justify-between items-center",m.className="flex items-center gap-2",p.className="font-semibold text-slate-100",f.className="text-xs text-slate-400",g.className="text-lg font-semibold text-slate-100",u.className="text-slate-300 leading-relaxed",p.textContent=n.author.name,f.textContent=l,g.textContent=n.title,u.textContent=n.body,n.author?.avatar?.url){const i=document.createElement("img");i.className="w-14 h-14 rounded-full object-cover border border-slate-700",i.src=n.author.avatar.url,i.alt=`${n.author.name}'s profile picture`,m.append(i)}if(n.media?.url){const i=document.createElement("img");i.className="w-full rounded-lg object-cover max-h-[500px] border border-slate-700",i.src=n.media.url,i.alt=n.media?.alt??"Post image",d.append(i)}const x=R("View Profile","primary");x.addEventListener("click",()=>{window.location.hash=`#/user/${n.author.name}`}),a.append(x),r.append(m,f),d.append(r),d.append(g),d.append(u);const c=document.createElement("div");c.className="mt-6 space-y-2";const v=n.comments;if(v.length===0){const i=document.createElement("p");i.className="text-sm text-slate-400 border-t border-slate-700 pt-2 mt-4",i.textContent="No comments yet",c.append(i)}else v.forEach(i=>{const h=document.createElement("div"),b=document.createElement("div"),w=document.createElement("img"),y=document.createElement("p"),E=document.createElement("p");h.className="border-t border-slate-700 pt-2 mt-4",b.className="flex items-center gap-4 py-2",E.className="text-sm font-semibold text-slate-100",y.className="text-sm text-slate-300",E.textContent=i.author.name,y.textContent=i.body,w.className="w-8 h-8 rounded-full border border-slate-700",w.src=i.author.avatar.url,w.alt=`${i.author.name}'s profile picture`,b.append(w,E),h.append(b,y),c.append(h)});d.append(c),s.append(d)}function ee(e){const t=document.createElement("div"),s=document.createElement("h2"),a=document.createElement("p"),o=document.createElement("p"),n=document.createElement("div"),l=document.createElement("div"),d=document.createElement("div"),r=document.createElement("span"),m=document.createElement("div"),p=document.createElement("div"),g=document.createElement("p"),f=document.createElement("div"),u=document.createElement("p");if(t.style.cursor="pointer",t.className="post-card",o.className="text-xs text-slate-400",a.className="post-textarea bg-slate-700 text-slate-100 border border-slate-800 shadow-md",l.className="flex justify-between items-center text-slate-400",d.className="flex items-center gap-2",m.className="w-10 h-10 rounded-full overflow-hidden",g.className="text-sm text-slate-400 ml-2 mt-2",u.className="text-sm text-slate-400",p.className="flex justify-between",f.className="flex items-center gap-1 text-sm text-slate-400 ml-2 mt-2",e.media?.url){const c=document.createElement("img");c.src=e.media.url,c.alt="Post image",n.append(c)}if(e.author?.avatar?.url){const c=document.createElement("img");c.src=e.author.avatar.url,c.alt=`${e.author.name} avatar`,c.className="w-10 h-10 rounded-full",m.append(c)}const x=new Date(e.updated).toLocaleString("no-NO",{day:"2-digit",month:"2-digit",year:"2-digit",hour:"2-digit",minute:"2-digit"});return s.textContent=e.title.charAt(0).toUpperCase()+e.title.slice(1),a.textContent=e.body,o.textContent=x,r.textContent=e.author?.name||"Unknown user",g.textContent=`${e._count.comments} Comments`,u.textContent=e._count.reactions,t.onclick=()=>Y(e.id),f.append(u,J()),p.append(g,f),d.append(m,r),l.append(d,o),t.append(l,s,n,a,p),t}async function te(){if(A()&&_())return`
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
        class="hidden fixed inset-0 items-start justify-center pt-24 z-50"
      >
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

        <div
          class="modal-panel bg-slate-900/80 border border-slate-700 rounded-xl shadow-xl p-6 w-full max-w-2xl relative max-h-[80vh] overflow-y-auto text-slate-100 backdrop-blur"
        >
          <div class="flex justify-between items-center mb-4">
            <div id="btn-wrapper" class="flex gap-2"></div>

            <button
              id="modal-close"
              class="px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg hover:border-indigo-500 hover:text-indigo-300 text-sm"
            >
              Close
            </button>
          </div>

          <div id="post-modal-content" class="mt-4"></div>
        </div>
      </div>
    `;window.location.hash="#/login"}let C=1,T=!1,$="";async function S(e,t=""){const s=document.getElementById("posts"),a=document.getElementById("next-page-btn");if(!(!s||!a)){T=!0,a.textContent="Loading...",a.disabled=!0;try{let o=`social/posts?page=${e}&limit=10&_author=true&_count=true`;t&&(o=`social/posts/search?q=${encodeURIComponent(t)}&_author=true&_count=true`);const n=await N(o),l=n.data,d=n.meta;s.innerHTML="",l.forEach(r=>{const m=ee(r);s.append(m)}),d.isLastPage?a.style.display="none":(a.textContent="Next Page",a.disabled=!1)}catch(o){console.error("Failed to fetch posts:",o),alert(o)}finally{T=!1}}}function oe(){const e=document.getElementById("next-page-btn"),t=document.getElementById("prev-page-btn");e.onclick=()=>{T||(C++,S(C,$),window.scrollTo(0,0))},t.onclick=()=>{T||C<=1||(C--,S(C,$),window.scrollTo(0,0))}}function ne(){const e=document.getElementById("search-form"),t=document.getElementById("search");e.addEventListener("submit",s=>{s.preventDefault(),$=t.value.trim(),C=1,S(C,$),window.scrollTo(0,0)})}function se(){return`
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
  `}function ae(){return`
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
  `}function le(){const e=document.getElementById("loginForm"),t=document.getElementById("email"),s=document.getElementById("password"),a=document.getElementById("loginError");e.addEventListener("submit",async o=>{o.preventDefault(),a.classList.add("hidden"),a.textContent="";try{const n=await M("auth/login",{email:t.value.trim(),password:s.value});if(K(n.data.accessToken),localStorage.setItem("username",n.data.name),!_()){const l=await M("auth/create-api-key",{name:"Social-App"});z(l.data.key)}window.location.hash="#/"}catch(n){a.textContent=n.message,a.classList.remove("hidden")}})}function re(e){return e?/^[A-Za-z0-9_]+$/.test(e.trim()):!1}function de(e){if(e)return/^[^\s@]+@stud\.noroff\.no$/.test(e.trim())}function ce(e){return e?e.length>=8:!1}function ie(){return`
    <section class="px-4 mt-12">
      <div
        class="max-w-md mx-auto bg-slate-800 border border-slate-700 rounded-xl shadow p-6 space-y-6"
      >
        <h1 class="text-2xl font-bold text-slate-100 text-center">Register</h1>

        <form id="registerForm" novalidate class="space-y-4">
          <div class="flex flex-col gap-1">
            <label for="name" class="text-sm text-slate-300">Name</label>
            <input
              id="name"
              type="text"
              placeholder="your_username"
              class="bg-slate-900 border border-slate-700 text-slate-100 placeholder:text-slate-400 rounded-lg px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div class="flex flex-col gap-1">
            <label for="email" class="text-sm text-slate-300">Email</label>
            <input
              id="email"
              type="email"
              placeholder="your.name@stud.noroff.no"
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
  `}function me(){const e=document.getElementById("registerForm"),t=document.getElementById("name"),s=document.getElementById("email"),a=document.getElementById("password"),o=document.getElementById("registerError");e.addEventListener("submit",async n=>{n.preventDefault(),o.classList.add("hidden"),o.textContent="";const l=t.value.trim(),d=s.value.trim(),r=a.value;if(!re(l)){o.textContent="Name can only contain letters, numbers and underscore",o.classList.remove("hidden");return}if(!de(d)){o.textContent="Email must be a valid @stud.noroff.no address",o.classList.remove("hidden");return}if(!ce(r)){o.textContent="The password must be at least 8 characters",o.classList.remove("hidden");return}try{await M("auth/register",{name:l,email:d,password:r}),window.location.hash="#/login"}catch(m){o.textContent=m.message,o.classList.remove("hidden")}})}function ue(){return`
    <section id="profile-page" class="flex flex-col items-center max-w-md mx-auto bg-slate-800 border border-slate-700 rounded-xl shadow p-6 space-y-6 mt-16 text-slate-100 text-sm" >
      <img id="avatar" class="w-24 rounded-full mt-4"></img>
      <h1 id="profileWelcome" class="font-semibold text-2xl text-center"></h1>
      <div class="mt-8 space-y-2 flex flex-col w-full max-w-xs p-4 bg-slate-600 rounded-lg shadow-md">
        <p id="followers" class="flex items-center gap-2"></p>
        <p id="following" class="flex items-center gap-2"></p>
        <p id="number-of-posts" class="flex items-center gap-2"></p>
      </div>
      <button id="logout" class=" bg-slate-900 hover:bg-slate-950 border border-slate-600 text-white px-5 py-2 text-sm rounded-lg font-medium"></button>
    </section>

      <div id="posts" class="mt-20 flex flex-col gap-12 items-center"></div>
      
  `}async function j(){const e=document.getElementById("logout"),t=document.getElementById("profile-page"),s=document.getElementById("posts");if(!A()){e.style.display="none",t.innerHTML="Please Log in to View your profile",s.innerHTML="";return}const a=localStorage.getItem("username"),o=await N(`social/profiles/${a}`),n=await N(`social/profiles/${a}/posts?_author=true&_count=true`),l=o.data,d=n.data;s.innerHTML="",console.log(d);const r=document.getElementById("profileWelcome"),m=document.getElementById("avatar"),p=document.getElementById("followers"),g=document.getElementById("following"),f=document.getElementById("number-of-posts");r.textContent=`Welcome back ${l.name}`,m.src=l.avatar.url,m.alt=`${l.name} avatar`,p.replaceChildren(),p.append(X(),` Followers: ${l._count.followers}`),g.replaceChildren(),g.append(F(),` Following: ${l._count.following}`),f.replaceChildren(),f.append(W(),` Posts: ${l._count.posts}`),d.forEach(u=>{const x=document.createElement("div"),c=document.createElement("h2"),v=document.createElement("p"),i=document.createElement("div"),h=document.createElement("button"),b=document.createElement("button"),w=document.createElement("dialog"),y=document.createElement("div"),E=document.createElement("label"),U=document.createElement("label"),L=document.createElement("input"),B=document.createElement("textarea"),O=document.createElement("div"),k=document.createElement("button"),P=document.createElement("button");if(E.textContent="Title",U.textContent="Body",c.textContent=u.title,v.textContent=u.body,h.textContent="Delete post",b.textContent="Update Post",k.textContent="Update",P.textContent="Close",x.className="w-full max-w-md bg-slate-800 border border-slate-700 rounded-xl shadow p-5 space-y-4",c.className="text-lg font-semibold text-slate-100",v.className="text-slate-300",i.className="flex gap-3 pt-2",h.className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium",b.className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium",w.className="bg-slate-900 text-slate-100 rounded-xl p-6 border border-slate-700 w-full max-w-md",y.className="flex flex-col gap-4",E.className="text-sm text-slate-300",U.className="text-sm text-slate-300",L.className="w-full p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 ",B.className="w-full p-2 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 ",B.rows=4,O.className="flex justify-end gap-2 pt-2",k.className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium ",P.className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium ",x.append(c),u.media?.url){const I=document.createElement("img");I.src=u.media.url,I.alt=u.media.alt||"Post image",I.className="w-full rounded-lg border border-slate-700",x.append(I)}x.append(v),O.append(P,k),y.append(E,L,U,B,O),w.replaceChildren(y),x.append(w),i.append(h,b),x.append(i),s.append(x),h.addEventListener("click",async()=>{confirm("Are you sure you want to delete this post?")&&(await G(`social/posts/${u.id}`),j())}),b.addEventListener("click",()=>{L.value=u.title,B.value=u.body,w.showModal()}),k.addEventListener("click",async()=>{await D(`social/posts/${u.id}`,{title:L.value,body:B.value}),w.close(),j()}),P.addEventListener("click",()=>{w.close()})}),e.textContent="Logout",e.addEventListener("click",()=>{localStorage.removeItem("username"),Z(),window.location.hash="#/login"})}async function pe(){if(A()&&_())return`
      <form
        id="create-form"
        class="max-w-md mx-auto bg-slate-800 border border-slate-700 rounded-xl shadow p-6 space-y-6 mt-10"
      >
        <h1 class="text-center text-2xl font-bold text-slate-100 mt-4 mb-10">
          Create your first socialApp post
        </h1>
        <div class="flex flex-col">
          <label for="post-title" class="text-sm text-slate-300 ml-1 mb-1"
            >Give your post a title</label
          >
          <input
            type="text"
            id="post-title"
            class="bg-slate-900 border border-slate-700 text-slate-100 rounded-lg px-3 py-2 text-sm outline-none focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div class="flex flex-col">
          <label for="post-content" class="text-sm text-slate-300 ml-1 mb-1"
            >Write your post</label
          >
          <textarea
            id="post-content"
            rows="6"
            class="bg-slate-900 border border-slate-700 text-slate-100 rounded-lg px-3 py-2 text-sm outline-none focus:outline-none focus:border-indigo-500"
          ></textarea>
        </div>
        <div class="flex flex-col">
          <label for="post-media-url" class="text-sm text-slate-300 ml-1 mb-1"
            >Attatch an image URL</label
          >
          <input
            type="text"
            id="post-media-url"
            class="bg-slate-900 border border-slate-700 text-slate-100 rounded-lg px-3 py-2 text-sm outline-none focus:outline-none focus:border-indigo-500"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-indigo-500 text-white px-3 py-2 text-sm rounded-lg hover:bg-indigo-600 font-medium"
        >
          Create Post
        </button>
      </form>
    `;window.location.hash="#/login"}function fe(){const e=document.getElementById("create-form"),t=document.getElementById("post-title"),s=document.getElementById("post-content"),a=document.getElementById("post-media-url");e.addEventListener("submit",async o=>{o.preventDefault();const n=t.value.trim(),l=s.value.trim(),d=a.value.trim(),r={title:n,body:l};d&&(r.media={url:d,alt:n||"Post image"});try{await M("social/posts",r),window.location.hash="#/"}catch(m){console.error(m),alert(m.message)}})}function V(){return`
    <section
      id="profile-page"
      class="flex flex-col items-center max-w-md mx-auto bg-slate-800 border border-slate-700 rounded-xl shadow p-6 space-y-6 mt-16 text-slate-100 text-sm"
    >
      <div id="btn-container" class="self-start w-full"></div>
      <h1 id="profileWelcome" class="font-semibold text-3xl text-center"></h1>
      <p id="user-email" class="!mt-0 text-slate-300"></p>
      <img id="avatar" class="w-24 h-24 rounded-full mt-4" />
      <div id="bio">
        <p id="user-bio" class="text-slate-300 "></p>
      </div>
      <div id="stats" class="flex w-full border-t-slate-500 border-t-2 ">
        <div id="followers" class="p-2 mt-2">
          <span id="followers-number" class="flex gap-1 text-white"></span>
        </div>
        <div id="posts-num" class="p-2 mt-2">
          <span id="posts-number" class="flex gap-1"></span>
        </div>
      </div>
    </section>
    <section>
      <h2
        id="posts-heading"
        class="my-6 text-slate-100 text-xl font-semibold"
      ></h2>
      <div id="posts" class="flex flex-col gap-12 items-start"></div>
    </section>
  `}async function ge(e){const t=(await N(`social/profiles/${e}?_following=true&_followers=true&_posts=true`)).data,s=document.getElementById("avatar"),a=document.getElementById("profileWelcome"),o=document.getElementById("user-bio"),n=document.getElementById("followers-number"),l=document.getElementById("posts-number"),d=document.getElementById("btn-container"),r=R("Follow"),m=document.getElementById("posts-heading"),p=document.getElementById("user-email"),g=localStorage.getItem("username");let f=t.followers.some(c=>c.name===g);u(),d.append(r);function u(){f?r.textContent="Unfollow":r.textContent="Follow"}r.onclick=async()=>{try{f?(await D(`social/profiles/${t.name}/unfollow`),f=!1):(await D(`social/profiles/${t.name}/follow`),f=!0),u()}catch(c){alert(c.message)}},s.src=t.avatar.url,a.textContent=`${t.name}'s Profile`,p.textContent=`@${t.email}`,t.posts.length>0?m.textContent=`${t.name}'s Posts`:m.textContent=`${t.name} has not made any posts yet`,t.bio===null?o.textContent="This user has not updated their bio yet":o.textContent=t.bio,d.append(r),n.append(F()),n.append(t.followers.length),l.append(W()),l.append(t.posts.length);const x=document.getElementById("posts");console.log(t),t.posts.forEach(c=>{const v=document.createElement("div"),i=document.createElement("h2"),h=document.createElement("p"),b=document.createElement("img");i.textContent=c.title,h.textContent=c.body,b.src=c.media.url,b.alt=c.media.alt,i.className="text-slate-100 text-lg mb-2",h.className="text-slate-400 text-sm mb-4",v.className="bg-slate-800 p-4 rounded-lg shadow-md",b.className="rounded-lg",v.append(i,h,b),x.append(v)})}function xe(){const e={"#/":te,"#/login":ae,"#/register":ie,"#/profile":ue,"#/create":pe,"#/user":V};async function t(){const s=window.location.hash||"#/",[a,o,n]=s.split("/");if(o==="user"&&n){document.getElementById("app").innerHTML=V(),await ge(decodeURIComponent(n));return}const l=e[s]||se;document.getElementById("app").innerHTML=await l(),s==="#/login"&&le(),s==="#/profile"&&j(),s==="#/register"&&me(),s==="#/create"&&fe(),s==="#/"&&(oe(),ne(),Q(),S(1,""))}window.addEventListener("hashchange",t),window.addEventListener("load",t)}window.addEventListener("DOMContentLoaded",()=>{xe()});
