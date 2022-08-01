//Firebase storage
const firebaseConfig = {
    apiKey: "AIzaSyBEIxH2FAp5AFQsgrJL3BEKJmKnEyrbM1U",
    authDomain: "devtorocketg20.firebaseapp.com",
    databaseURL: "https://devtorocketg20-default-rtdb.firebaseio.com",
    projectId: "devtorocketg20",
    storageBucket: "devtorocketg20.appspot.com",
    messagingSenderId: "922740208168",
    appId: "1:922740208168:web:e073479da552b0f27ebb1d"
  };

// Inicializaz Firebase
firebase.initializeApp(firebaseConfig);

//Decalaracion de variables
let btnPublish = document.querySelector(".btn-publish-post");
let postBody = document.querySelector("#editor-content");
let btnImage = document.querySelector("#post-editor-cover");
let result = document.querySelector('.result');
let cover = "";
let helpTitle = document.querySelector(".help-post-title");
let helpContent = document.querySelector(".help-post-content");
let helpTags = document.querySelector(".help-post-tags");
let postOptions = document.querySelector(".post-options-dropdown");

//Froala Editor
let editor = new FroalaEditor('textarea#editor-content', {
    toolbarButtons: [ 'bold', 'italic','fontSize', 'color', 'underline', 'strikeThrough', 'formatOL', 'formatUL', 'outdent', 'indent','quote', 'clearFormatting', 'insertTable', 'html'],
    placeholderText: 'Write your post content here...',
    events: {
        'focus': function () {
            helpTitle.classList.add("d-none");
            helpContent.classList.remove("d-none");
            helpTags.classList.add("d-none");
        }
      }    
});

//! Eventos
document.querySelector(".btn-cover-post").addEventListener("click", () =>{
    btnImage.click();
});
btnImage.addEventListener("change", ()=>{
    //spinner
    document.querySelector(".btn-cover-post").innerHTML = `<div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>`;
    uploadImage();
});

document.querySelector(".cursor-pointer").addEventListener("click", () => {
    toggle(helpContent, "top-0");
});

document.querySelector(".btn-open-options").addEventListener("click", () => {
    toggle(postOptions, "d-none");
});

// Eventos para mostrar los side help
document.querySelector(".post-editor-title").addEventListener('focus', () => {
    helpContent.classList.add("d-none");
    helpTitle.classList.remove("d-none");
    helpTags.classList.add("d-none");
});

btnPublish.addEventListener("click" , (e) => {  

    let tags = getTags(tagify.value);    
    let title = document.querySelector(".post-editor-title").value;
    let content = document.querySelector(".post-editor-content").value;

    if( title == '' || content == '')
    {        
        result.innerHTML = `<div class="alert alert-danger" role="alert">
            Los campos no pueden estar vacios.
        </div>`;
    }
    else{
        //Create post object
        const newPost = {
            title: title,
            content: content,
            urlCoverImage: cover,
            author: 'Panda Rojo',
            createdDate: new Date().toLocaleDateString(),
            mintoread: Math.ceil(editor.charCounter.count() / 200),
            avatarAuthor: './assets/images/avatars/avatar.jpg',
            tags: tags
        }       
        
        fetch('https://devtorocketg20-default-rtdb.firebaseio.com/posts.json', {method: "POST",body: JSON.stringify(newPost),headers: {"Content-type": "application/json; charset=UTF-8"}})
        .then((res)=>{
                return res.json();
        }).then((res)=>{
                console.log(res.name);
                result.innerHTML =  `<div class="alert alert-success" role="alert">
                        El formulario ha sido enviado
                    </div>`;
                    setTimeout(
                        function(){
                            window.location = `detail.html?id?${res.name}` 
                        },
                    1500);
        }).catch((error)=>{
            result.innerHTML =  `<div class="alert alert-danger" role="alert">
            Ocurrio un error. ${error}
        </div>`;      
        });
    }
});

//! Functions
/**
 *  Funcion para subir image cover a Firebase Storage, imprime cover en img tag 
 *  */
const uploadImage = () => {
    const ref = firebase.storage().ref();
    const file = btnImage.files[0];
    const name = +new Date() + "-" + file.name;
    const metadata = {
      contentType: file.type
    };
    const task = ref.child(name).put(file, metadata);

    task
      .then(snapshot => {
        return snapshot.ref.getDownloadURL();
      })
      .then(url => {      
        cover = url;  
        document.querySelector("#preview-image").src = url;
        document.querySelector(".btn-cover-post").textContent  = `Change`;
      })
      .catch(console.error);
}

/**
 *Funcion para obtener tags de tagify en forma de array de strings 
 * parametro: Array de objetos (tagify.value)
 * retorno: Array de strings
 */
const getTags = (tagifyArr) => {
    let tags = tagifyArr.map((tag) => {        
        return tag.value
    })
    return tags;
}


/**
 * Tagify
 */
 var inputTags = document.querySelector('input[name=tags-manual-suggestions]'),
 // init Tagify script on the above inputs
 tagify = new Tagify(inputTags, {
     whitelist : [ "Apex (Salesforce.com)", "Assembly language", "ASP.NET", "Bash", "Batch (Windows/Dos)", "C++ ", "C/AL", "C#", "Java", "Javascript", "MATLAB", "CSS", "HTML", "Ruby"],
     dropdown: {
        maxItems: 100,           
        classname: "tags-look", 
        enabled: 1,             
        closeOnSelect: false 
      },
     enforceWhitelist: false
 });
 tagify.DOM.input.addEventListener('focus', () => {
    helpContent.classList.add("d-none");
    helpTitle.classList.add("d-none");
    helpTags.classList.remove("d-none");
 });
 

 