
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
console.log()

let url = `https://devtorocketg20-default-rtdb.firebaseio.com/posts/${postId}.json`
console.log(url)

//! Hacer el request con el metdoo get del post selccionado y isertarla en mi template 

console.log(url)

let detailPost = document.querySelector('#detailPostView')
document.addEventListener("DOMContentLoaded", (e) => {
    let posts = getDetailPost(url);
    let tags="";
    if(posts.tags.length>0){
    posts.tags.forEach((tag)=>{
        tags +=`<a href="#" class="card-link text-decoration-none">#${tag}</a>`   
        })
    }
    detailPost.innerHTML =
        `
        <img src="${posts.urlCoverImage}" alt="main-image">
        <div class="card-body p-3 p-md-5 ">
        <div class="d-flex align-items-center mb-3">
                                <div class="main-profile">
                                    <img class="rounded-circle" src="${posts.avatarAuthor}" alt="profile">
                                </div>
                                <div class="mx-2 profile-name">
                                    <a href="" class="text-decoration-none">${posts.author}</a>
                                    <p class="post-date m-0">${new Date(posts.createdDate).toLocaleDateString('en-us', dateFormatOptions)}</p>
                                </div>
                            </div>
                            <div class=" card-content p-0">
                                <h1>${posts.title}</h1>
                                <div class="d-flex">
                                  ${tags}  
                                </div>
                            </div>
                            <div class="card-post pt-4">
                                ${posts.content}
                            </div>
                            </div>`
})

//section del perfil card
let profileDetailPost = document.querySelector('#profileDetailPost')
document.addEventListener("DOMContentLoaded", (e) => {
    let posts = getDetailPost(url);
    let tags="";
    if(posts.tags.length>0){
    posts.tags.forEach((tag)=>{
        tags +=`<a href="#" class="card-link text-decoration-none">#${tag}</a>`   
        })
    }
    profileDetailPost.innerHTML =
        `
        <div class="card-border"></div>
                        <div class="card-body p-3 pt-0">
                            <div class="mt-n4">
                                <a href="#" class="d-flex align-items-end">
                                    <div class="card-profile-avatar">
                                        <img src="${posts.avatarAuthor}" class="avatar" alt="">
                                    </div>
                                    <span class="card-profile-name">${posts.author}</span>
                                </a>
                            </div>
                            <div class="btn-follow-container mt-4">
                                <button name="button" type="button" class="btn btn-follow border-0">Follow</button>
                            </div>
                            <div class="card-profile-title mt-4">
                                Software Engineer, Pokemon Master at <strong>Team Rocket</strong>
                            </div>
                            <div class="user-details-container">
                                <ul class="user-details">
                                    <li>
                                        <div class="key">
                                            Location
                                        </div>
                                        <div class="value">
                                            Kanto
                                        </div>
                                    </li>
                                    <li>
                                        <div class="key">
                                            Education
                                        </div>
                                        <div class="value">
                                            Life University
                                        </div>
                                    </li>
                                    <li>
                                        <div class="key">
                                            Work
                                        </div>
                                        <div class="value">
                                            Software Engineer at <strong>Team Rocket</strong>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="key">
                                            Joined
                                        </div>
                                        <div class="value">
                                            <time class="date">Jan 01, 2020</time>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>`
})



