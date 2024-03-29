var shareImageButton = document.querySelector('#share-image-button');
var createPostArea = document.querySelector('#create-post');
var closeCreatePostModalButton = document.querySelector('#close-create-post-modal-btn');

function openCreatePostModal() {
  createPostArea.style.display = 'block';
}

function closeCreatePostModal() {
  createPostArea.style.display = 'none';
}

// var url = 'https://submit-form-72a70-default-rtdb.europe-west1.firebasedatabase.app/.json';
// var networkDataRecieve = false;

fetch(url,{
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  body: JSON.stringify({
    message: ''
  })
}).then((res)=>{
  return res.json();
}).then((err)=>{
  console.log('Errrrr!!!Sorry data cannot be fetch now');
})

shareImageButton.addEventListener('click', openCreatePostModal);
closeCreatePostModalButton.addEventListener('click', closeCreatePostModal);
