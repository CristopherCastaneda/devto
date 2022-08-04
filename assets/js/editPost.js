params = new URLSearchParams(window.location.search)
let postIdDetail = params.get('id')
let btnEdit = document.querySelector("#editPostBtn");

//! Events
// document.querySelector(".btn-cover-post").addEventListener("click", () =>{
//     btnImage.click();
   
// });

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

btnEdit.addEventListener("click", (e) => { 

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
            avatarAuthor: './assets/images/avatars/avatar.png',
            tags: tags
        }       
        
        
        
        fetch(`https://devtorocketg20-default-rtdb.firebaseio.com/posts/${postIdDetail}.json`, {method: "PATCH",body: JSON.stringify(newPost),headers: {"Content-type": "application/json; charset=UTF-8"}})
        .then((res)=>{
                return res.json();
        }).then((res)=>{
                console.log(res.name);
                result.innerHTML =  `<div class="alert alert-success" role="alert">
                        El formulario ha sido Editado
                    </div>`;
                    setTimeout(
                        function(){
                            window.location = `detail.html?id=${postIdDetail}` 
                        },
                    1500);
        }).catch((error)=>{
            result.innerHTML =  `<div class="alert alert-danger" role="alert">
            Ocurrio un error. ${error}
        </div>`;      
        });
    }
});
document.addEventListener("DOMContentLoaded", (e) => { 
    
    let url = `https://devtorocketg20-default-rtdb.firebaseio.com/posts/${postIdDetail}.json`

    fetch(url)
    .then((res)=>{
            return res.json();
    }).then((post)=>{
        document.getElementById("preview-image").src =post.urlCoverImage;        
          document.querySelector(".post-editor-title").value = post.title;
          editor.html.insert(post.content);
          if('tags'in post){
          inputTags.value=post.tags;
        }
    }).catch((error)=>{
        console.log(error);      
    });

});



 