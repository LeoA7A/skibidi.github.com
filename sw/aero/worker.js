importScripts("/sw/aero/config.js"),importScripts("/sw/aero/url.js"),importScripts("/sw/aero/headers.js"),importScripts("/sw/aero/bare.js"),importScripts("/sw/aero/css.js"),self.addEventListener("install",(e=>{e.waitUntil(skipWaiting())})),self.addEventListener("activate",(e=>{e.waitUntil(clients.claim())}));var assetURL=["/sw/aero/url.js?","/sw/aero/config.js?","/sw/aero/client/el.js?","/sw/aero/client/element.js?","/sw/aero/client/eval.js?","/sw/aero/client/http.js","/sw/aero/client/ws.js"].map((e=>location.origin+e));function query(e){return new URLSearchParams(new URL(e.referrer).search).get("__aero$referrer")}const p=new Promise((e=>{caches.open("astro-data").then((t=>{t.match("/bare.txt").then((async t=>{var r=t?await t.text():"";try{const e=await fetch("http://"+r.replace(/\/$/,"")+"/",{redirect:"follow"});__aero$config.bare=e.url}catch{}e()}))}))}));async function fetchEvent({request:e}){try{if(await p,e.url.endsWith("?sw=ignore"))return await fetch(e);if(assetURL.find((t=>e.url.startsWith(t))))return fetch(e);var t=e.url,r="";try{r=__aero$decodeURL(e.referrer),e.referrer==location.origin+"/"&&(r="")}catch(e){}e.url.startsWith(location.origin+__aero$config.scope)||(t=__aero$encodeURL(e.url.replace(location.origin,""),r));var s=new URL(__aero$decodeURL(t).href.replace(/^http:/i,"https:"));if("https:"!==s.protocol&&"http:"!==s.protocol)return fetch(e);var a=await makeBareRequest(s,e);a.headers.delete("Content-Security-Policy"),a.headers.delete("X-Frame-Options");var n=Object.fromEntries(a.headers);for(var i in n)"location"==i.toLowerCase()&&(n[i]=__aero$encodeURL(n[i],s));if("document"==e.destination||"iframe"==e.destination){if(a.headers.get("content-type").startsWith("text/html"))return o=`\n          <script src="/sw/aero/config.js?" aero-core=1><\/script>\n          <script src="/sw/aero/url.js?" aero-core=1><\/script>\n          <script src="/sw/aero/client/el.js?" aero-core=1><\/script>\n          <script src="/sw/aero/client/http.js?" aero-core=1><\/script>\n          <script src="/sw/aero/client/ws.js?" aero-core=1><\/script>\n          <script src="/sw/aero/client/eval.js?" aero-core=1><\/script>\n  \n          ${o=await a.text()}\n  \n          <script src="/sw/aero/client/element.js?" aero-core=1><\/script>\n        `,new Response(o,{status:a.status,statusText:a.statusText,headers:new Headers(n)});if("script"==e.destination||"worker"==e.destination)return o=(o=await a.text()).replace(/location/gim,"__aero$location").replace(/postMessage/gim,"__aero$postMessage"),new Response(o,{status:a.status,statusText:a.statusText,headers:new Headers(n)});if("style"==e.destination){var o=await a.text();return o=rewriteCss(o,s),new Response(o,{status:a.status,statusText:a.statusText,headers:new Headers(n)})}}"text/event-stream"===e.headers.get("accept")&&(n["content-type"]="text/event-stream");var c=await a.blob();return-1!==[204,101,205,304].indexOf(a.status)&&(c=null),new Response(c,{status:a.status,statusText:a.statusText,headers:new Headers(n)})}catch(e){return new Response(e,{status:500})}}self.addEventListener("fetch",(function(e){e.respondWith(fetchEvent(e))}));