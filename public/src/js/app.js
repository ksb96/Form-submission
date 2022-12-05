var deferPrompt;

//registering the service-worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(()=>{
        console.log('Service worker registered');
    });
}

//install-prompt banner(later)
window.addEventListener('beforeinstallprompt', (event)=>{
    console.log('beforeinstallprompt fired');
    event.preventDefault();
    deferPrompt = event;
    return false;
});