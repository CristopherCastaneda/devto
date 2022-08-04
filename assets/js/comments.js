//Var declarations
let btnSaveComments = document.querySelector(".btn-save-comment");
let commentForm = document.querySelector(".form-comments");
let commentsContainer = document.querySelector("#all-comments-container");
let comment = document.querySelector("#comment-content");

//! Events
commentForm.addEventListener("click", () => {
    document.querySelector(".comment-form-toolbar").classList.remove("d-none");
    document.querySelector(".comment-form-buttons").classList.remove("d-none");
});

comment.addEventListener("input", (event) => {
    console.log(comment.value)
    if(comment.value != null && comment.value != ""){
        btnSaveComments.disabled = false;
    }
    else{
        btnSaveComments.disabled = true;
    }
});
/*
*  Save comment event
*/
btnSaveComments.addEventListener("click", (e) => {
    e.preventDefault();
    let params = new URLSearchParams(window.location.search);
    let postID = params.get('id');
    let commentValue = comment.value;

    const newComment = {
        author : getRandomName(),
        content: commentValue,
        date: new Date().toLocaleDateString()        
    }    

    fetch(`https://devtorocketg20-default-rtdb.firebaseio.com/posts/${postID}/comments.json`, {method: "POST",body: JSON.stringify(newComment),headers: {"Content-type": "application/json; charset=UTF-8"}})
    .then((res)=>{
            return res.json();
    }).then((res)=>{
            console.log(res.name);            
            setTimeout(
                function(){
                    location.reload()
                },
             1500);
    }).catch((error)=>{
        console.log(error);      
    });

});

/**
 * Function to display comments
 */

const printComments = (comments) => {
    let count = 0;
    let template = "";
    for(let idComment in comments) {
        template += `
        <div class="comments-container d-flex align-items-start mt-3">
            <span class="comments-avatar rounded-circle">
                <img src="./assets/images/avatars/dummy.png">
            </span>
            <div class="comment-content">
                <div class="comment p-3">
                    <div>
                        <small><strong>${comments[idComment].author}</strong><span class="opacity-50"> • ${new Date(comments[idComment].date).toLocaleDateString('en-us', dateFormatOptions)}</span></small> 
                    </div>
                    ${comments[idComment].content}
                </div>
                <div class="reactions mt-2">
                    <button class="btn btn-reaction">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                            viewBox="0 0 24 24" role="img" aria-hidden="true" class="crayons-icon">
                            <path
                                d="M21.179 12.794l.013.014L12 22l-9.192-9.192.013-.014A6.5 6.5 0 0112 3.64a6.5 6.5 0 019.179 9.154zM4.575 5.383a4.5 4.5 0 000 6.364L12 19.172l7.425-7.425a4.5 4.5 0 10-6.364-6.364L8.818 9.626 7.404 8.21l3.162-3.162a4.5 4.5 0 00-5.99.334l-.001.001z">
                            </path>
                        </svg>
                        <span class="reactions-count">4 <span
                                class="d-none d-md-inline">likes</span></span>
                    </button>
                    <button class="btn btn-reaction">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" role="img"
                            aria-labelledby="a5h4ee11ner0isdenyplmiv9abvxgdvk"
                            class="crayons-icon reaction-icon not-reacted">
                            <title id="a5h4ee11ner0isdenyplmiv9abvxgdvk">Comment button</title>
                            <path
                                d="M10.5 5h3a6 6 0 110 12v2.625c-3.75-1.5-9-3.75-9-8.625a6 6 0 016-6zM12 15.5h1.5a4.501 4.501 0 001.722-8.657A4.5 4.5 0 0013.5 6.5h-3A4.5 4.5 0 006 11c0 2.707 1.846 4.475 6 6.36V15.5z">
                            </path>
                        </svg>
                        <span class="reactions-count"><span
                                class="d-none d-md-inline">Reply</span></span>
                    </button>
                </div>
            </div>
        </div>
        `;
        count ++;
    }  
    commentsContainer.innerHTML = template; 
    document.querySelector(".comments-count").innerHTML = `(${count})`;
}

function getRandomName(){
    const names =[    
        "Ferndinand Bracho",    
        "Cristopher Castañeda",
        "Mariana Rechy",
        "Alfredo Pizaña",
        "Brisa Hernandez",
        "Sofy Arreguin",
        "Ángel Reséndiz",
    ]
    const randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];    
}