//installing worker
self.addEventListener('install',(event)=>{
    console.log('[Service-worker] installing worker...', event);
});

//activating worker
self.addEventListener('activate',(event)=>{
    console.log('[Service-worker] activating worker...', event);
    return self.clients.claim();
});

//fetch
self.addEventListener('fetch', (event)=>{
    console.log('[Service-worker] fetching...', event);
    event.respondWith(fetch(event.request));
});