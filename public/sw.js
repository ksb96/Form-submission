//installing worker
self.addEventListener('install', (event) => {
    console.log('[Service-worker] installing worker...', event);
    //wait for caching to be done
    event.waitUntil(caches.open('static')
        //cache
        .then(function (cache) {
            console.log('caching app shell');
            cache.addAll([
                '/',
                '/index.html',
                '/about.html',
                '/help.html',
                '/src/js/app.js',
                '/src/js/material.min.js',
                '/src/css/app.css',
                '/src/css/feed.css',
                // '/src/images/main-image-sm.jpg',
                'https://fonts.googleapis.com/css?family=Roboto:400,700',
                'https://fonts.googleapis.com/icon?family=Material+Icons',
                'https://cdnjs.cloudflare.com/ajax/libs/material-design-lite/1.3.0/material.indigo-pink.min.css'
            ]);
        }))
});

//activating worker
self.addEventListener('activate', (event) => {
    console.log('[Service-worker] activating worker...', event);
    return self.clients.claim();
});

//fetch
self.addEventListener('fetch', (event) => {
    event.respondWith(caches.match(event.request).then((response) => {
        if (response) {
            return response;
        } else {
            return fetch(event.request);
        }
    })
    );
});