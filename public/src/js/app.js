var deferPrompt;

//legacy support - promise & fetch
if(!window.Promise){
    window.Promise = Promise;
}

//registering the service-worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(() => {
        console.log('Service worker registered');
    });
}

//fetch - GET
fetch('https://catfact.ninja/fact').then(function (response) {
    console.log(response);
    return response.json();
}).then(function (data) { //promise
    console.log(data);
}).catch(function (err) {
    console.log(err);
});
//POST
fetch('https://httpbin.org/post', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify({ message: 'Its works??!' })
}).then(function (response) {
    console.log(response);
    return response.json();
}).then(function (data) { //promise
    console.log(data);
}).catch(function (err) {
    console.log(err);
});


//install-prompt banner(later)
window.addEventListener('beforeinstallprompt', (event) => {
    console.log('beforeinstallprompt fired');
    event.preventDefault();
    deferPrompt = event;
    return false;
});