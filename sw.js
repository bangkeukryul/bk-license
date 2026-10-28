const C='bk-license-v3';
const FILES=['./','index.html','manifest.json','icon-192.png','icon-512.png','icon-maskable-512.png','apple-touch-icon.png'];
/* 같은 주소를 BK톡톡 · BK쇼츠 · BK프롬과 함께 쓰므로 'bk-license-' 것만 지운다 */
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('bk-license-')&&k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
 const u=new URL(e.request.url);
 if(e.request.method!=='GET'||u.origin!==location.origin||!u.pathname.startsWith('/bk-license/'))return;
 e.respondWith(fetch(e.request.url,{cache:'no-cache',credentials:'same-origin'}).then(r=>{if(r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp))}return r}).catch(()=>caches.open(C).then(c=>c.match(e.request,{ignoreSearch:true}).then(m=>m||c.match('index.html')))));
});
