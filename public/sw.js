var CACHE_STATIC_VERSION = 'static-v9';
var CACHE_DYNAMIC_VERSION = 'dynamic-v7';
var STATIC_FILES = [
                    '/',
                    '/index.html',
                    '/src/pages/offline.html',
                    // '/about.html',
                    // '/help.html',
                    '/src/js/app.js',
                    '/src/js/material.min.js',
                    '/src/css/app.css',
                    '/src/css/feed.css',
                    'https://fonts.googleapis.com/css?family=Roboto:400,700',
                    'https://fonts.googleapis.com/icon?family=Material+Icons',
                    'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
                    ];

//installing worker
self.addEventListener('install', (event) => {
    console.log('[Service-worker] installing worker...', event);
    //wait for caching to be done
    event.waitUntil(caches.open(CACHE_STATIC_VERSION)
        //cache hard-code
        .then(function (cache) {
            console.log('caching app shell');
            cache.addAll(STATIC_FILES);
        }))
});

//activating worker
self.addEventListener('activate', (event) => {
    console.log('[Service-worker] activating worker...', event);
    // caching versions
    event.waitUntil(caches.keys().then((keyList) => {
        return Promise.all(keyList.map((key) => {
            if (key !== CACHE_STATIC_VERSION && key !== CACHE_DYNAMIC_VERSION) {
                console.log('[Service-worker] removing old cache', key);
                return caches.delete(key);
            }
        }))
    }))
    return self.clients.claim();
});

// fetch - from network
self.addEventListener('fetch', (event) => {
    event.respondWith(fetch(event.request).then((res)=>{
        return caches.open(CACHE_DYNAMIC_VERSION).then((cache) => {
            cache.put(event.request.url, res.clone());
            return res;
        })
    }).catch((err)=>{ //network fetch
       return caches.match(event.request) //cache fetch, if network fetch fail
        })
    );
})

//fetch - from cache
self.addEventListener('fetch', (event) => {
    event.respondWith(caches.match(event.request).then((response) => {
        if (response) {
            return response;
        } else {
            // dynamic caching
            return fetch(event.request)
                .then((res) => {
                    return caches.open(CACHE_DYNAMIC_VERSION).then((cache) => {
                        cache.put(event.request.url, res.clone());
                        return res;
                    })
                });
        }
    }).catch((err) => {
        return caches.open(CACHE_STATIC_VERSION).then((cache)=>{
            if(event.request.headers.get('accept').includes('text/html')){ //fallback
                return cache.match('/index.html');
            }
           
        });
    })
    );
});