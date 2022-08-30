params = new URLSearchParams(window.location.search)
let postIdDetail = params.get('id')
let btnEdit = document.querySelector("#editPostBtn");

btnImage.addEventListener("change", ()=>{
    //spinner
    document.querySelector(".btn-cover-post").innerHTML = `<div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>`;
    uploadImage();
});

btnEdit.addEventListener("click", async (e) => { 
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
            //Create post object
            const newPost = {
                post_title: title,
                post_body: content,
                post_banner: cover,
                post_date: new Date(),
                tags: tags,            
                read_time: Math.ceil(quill.getText().length / 200)                           

            }   
            //Save Post
            const responsePost = await fetch(`${APIURL}post/${postIdDetail}`, {
                method: "PATCH",
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
document.addEventListener("DOMContentLoaded", async (e) => { 
    
    try{
        const response = await fetch(`${APIURL}post/${postIdDetail}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json"
            }
        });
        
        const posts = await response.json();          
        let post = posts.data.post;

        document.getElementById("preview-image").src =post.post_banner;        
        document.querySelector(".post-editor-title").value = post.post_title;
        quill.root.innerHTML = post.post_body;
        if('tags'in post){
          inputTags.value=post.tags;
        }
    }
    catch(error){
        console.log(error);
    }   

});



 