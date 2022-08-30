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

// Firebase Init
firebase.initializeApp(firebaseConfig);

// Var declaration
let btnPublish = document.querySelector("#btnPublish");
let postBody = document.querySelector("#editor-content");
let btnImage = document.querySelector("#post-editor-cover");
let result = document.querySelector('.result');
let cover = "";
let helpTitle = document.querySelector(".help-post-title");
let helpContent = document.querySelector(".help-post-content");
let helpTags = document.querySelector(".help-post-tags");
let postOptions = document.querySelector(".post-options-dropdown");

var quill = new Quill('#editor-content', {
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6,  false] }],
        ['bold', 'italic', 'underline','strike'],
        ['blockquote', 'code-block', 'align'],
        ['link'],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['clean']
      ]
    },
    placeholder: 'Write your post content here...',
    theme: 'snow'  // or 'bubble'
  });
    quill.root.addEventListener("click", () => {
        helpTitle.classList.add("d-none");
        helpContent.classList.remove("d-none");
        helpTags.classList.add("d-none");
    });

//! Events
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

// help elements display
document.querySelector(".post-editor-title").addEventListener('focus', () => {
    helpContent.classList.add("d-none");
    helpTitle.classList.remove("d-none");
    helpTags.classList.add("d-none");
});

if(btnPublish){

btnPublish.addEventListener("click" , async (e) => {  

    try{

        let tags = getTags(tagify.value);    
        let title = document.querySelector(".post-editor-title").value;
        let content = quill.root.innerHTML;

        if( title == '' || content == '')
        {        
            result.innerHTML = `<div class="alert alert-danger" role="alert">
                Los campos no pueden estar vacios.
            </div>`;
        }
        else{
            //Get user data
            let userPost = await getUser();

            //Create post object
            const newPost = {
                post_title: title,
                post_body: content,
                post_banner: cover,
                post_date: new Date(),
                tags: tags,            
                read_time: Math.ceil(quill.getText().length / 200),
                user: userPost              

            }   
            console.log(newPost)
            //Save Post
            const responsePost = await fetch(`${APIURL}post`, {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(newPost)
            });
            
            const post = await responsePost.json();
            result.innerHTML =  `<div class="alert alert-success" role="alert">
                            El formulario ha sido enviado
                        </div>`;
            setTimeout(
                function(){
                    window.location = `detail.html?id=${post.data.post._id}` 
                },
            1500);
        }
    }
    catch(error){
        console.log(error);
        result.innerHTML =  `<div class="alert alert-danger" role="alert">
                Ocurrio un error. ${error}
            </div>`;
    }
});
}
//! Functions
/**
 *  Function to load image on Firebase Storage
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
 * Get tagify tags
 * params:  (tagify.value)
 * return: new array of tags
 */
const getTags = (tagifyArr) => {
    let tags = tagifyArr.map((tag) => {        
        return tag.value;
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
     enforceWhitelist: false,
     maxTags: 4            
 });

 tagify.DOM.input.addEventListener('focus', () => {
    helpContent.classList.add("d-none");
    helpTitle.classList.add("d-none");
    helpTags.classList.remove("d-none");
 });
 

 const getUser = async () => {
    let testid = "630d72f4c193ea15dbe46ab9";
    const response = await fetch(`${APIURL}users/${testid}`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json"
        }
    });
    
    const user = await response.json(); 
    let userPost = user.data.user;
    delete userPost.password;
    delete userPost.savedPost;

    return userPost;
 }