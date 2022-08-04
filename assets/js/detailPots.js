
const dateFormatOptions = { month: 'short', day: 'numeric' };
//Funcion de click en las reacciones  falta hacer que se guarden en el post de seleccion y no se borren.
// const increment = document.querySelector("#heart");
// const count = document.querySelector("#reaction-Heart");

// increment.addEventListener("click", () => {
//     count.innerText = Number(count.innerText) + 1;
//     if (count.innerText > 1) {
//         count.innerText = 0;
//         return count
//     };
// });

// const incrementU = document.querySelector("#unicorn");
// const countU = document.querySelector("#reaction-Unicorn");


// incrementU.addEventListener("click", () => {
//     countU.innerText = Number(countU.innerText) + 1;
//     if (countU.innerText > 1) {
//         countU.innerText = 0;
//         return countU
//     };
// });


// const incrementS = document.querySelector("#save");
// const countS = document.querySelector("#reaction-save");


// incrementS.addEventListener("click", () => {
//     countS.innerText = Number (countS.innerText) + 1;
//     if (countS.innerText > 1) {
//         countS.innerText = 0;
//         return countS
//     };
// });


// aqui termina la funcion

//!evento de visualizacion del detail post


//nuevo parte

const getDetailPost = (url) => {
    let posts = [];
    const postRequest = new XMLHttpRequest();

    postRequest.onload = (data) => {

        if (data.target.readyState === 4) {
            if (
                data.target.status >= 200 ||
                data.target.status <= 399
            ) {
                posts = JSON.parse(data.target.response);
            }
            else if (data.target.status === 400) {
                console.log('sucedio un error')
            }
        }
    }
    postRequest.open("GET", url, false);
    postRequest.send();
    return posts;
}
let params = new URLSearchParams(window.location.search);
let postId = params.get('id');
console.log(postId)
let url = `https://devtorocketg20-default-rtdb.firebaseio.com/posts/${postId}.json`;


//! Hacer el request con el metdoo get del post selccionado y isertarla en mi template 

console.log(url)

let detailPost = document.querySelector('#detailPostView')
document.addEventListener("DOMContentLoaded", (e) => {
    let posts = getDetailPost(url);
    let tags = "";
    let editPost= posts.author;
    
    let btnEditPost="";
    if(editPost=="Panda Rojo") {
        
        btnEditPost += `<a href="./editPost.html?id=${postId}" class="crayons-btn crayons-btn--s crayons-btn--ghost px-2">Edit</a>
                <a href="" class="crayons-btn crayons-btn--s crayons-btn--ghost px-2">Manage</a>
                <a href="" class="crayons-btn crayons-btn--s crayons-btn--ghost px-2">stats</a>`
    } 
    
    if ('tags' in posts) {
        if (posts.tags.length > 0) {
            posts.tags.forEach((tag) => {
                tags += `<div class="class="d-flex btnEditPost""><a href="#" class="card-link text-decoration-none">#${tag}</a>`;
            })
        }
    }
    detailPost.innerHTML =
        `
        <img src="${posts.urlCoverImage}" alt="main-image">
        <div class="card-body p-3 p-md-5 ">
        <div class="d-flex justify-content-between mb-3">
            <div class="d-flex align-items-center mb-3">
                <div class="main-profile">
                    <img class="rounded-circle" src="${posts.avatarAuthor}" alt="profile">
                </div>
                <div class="mx-2 profile-name">
                    <a href="" class="text-decoration-none">${posts.author}</a>
                    <p class="post-date m-0">${new Date(posts.createdDate).toLocaleDateString('en-us', dateFormatOptions)}</p>
                </div>
                
        </div>
        <div class="btnEditPost mb-4 s:mb-0">
                ${btnEditPost}
            </div>
                </div>
            
            <div class=" card-content p-0">
                <h1>${posts.title}</h1>
                <div>
                    ${tags}
                </div>
            </div>
            <div class="card-post pt-4">
                ${posts.content}
            </div>
        </div>
        `;
    //Update profile
    updateProfile(posts.avatarAuthor, posts.author);
    if ('comments' in posts) {
        printComments(posts.comments);
    }

})

let updateProfile = (photo, name) =>{
    document.querySelector("#profileDetailPost .avatar").src = photo;
    document.querySelector(".card-profile-name").innerHTML = name;
    document.querySelector("#profile-name").innerHTML =  name;
}
