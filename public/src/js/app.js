var deferPrompt;
var enableNotificationsButtons = document.querySelectorAll('.enable-notifications');
// const mongoose = require('mongoose')
// const MongoStore = require('connect-mongo');

//legacy support - promise & fetch
if(!window.Promise){
    window.Promise = Promise;
}

//registering the service-worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then(() => {
        console.log('Service worker registered');
    }).catch(function (err) {
        console.log(err);
    });
}

//install-prompt banner(later)
window.addEventListener('beforeinstallprompt', (event) => {
    console.log('beforeinstallprompt fired');
    event.preventDefault();
    deferPrompt = event;
    return false;
});

// ask-permission
function askForNotificationPermission() {
    Notification.requestPermission(function(result){
        console.log('User Choice', result);
        if(result !== 'granted'){
            console.log('No notification permission granted');
        }else{

        }
    });
}

//notification
if('Notification' in window){
    for(var i = 0; i < enableNotificationsButtons; i++){
        enableNotificationsButtons[i].style.display = 'inline-block';
        enableNotificationsButtons[i].addEventListener('click',askForNotificationPermission);
    }
}

//mongodb connect
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://kushalcr78017:pwaTest23@pwatest.1getlb6.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });
