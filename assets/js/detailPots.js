const dateFormatOptions = { month: 'short', day: 'numeric' };
let params = new URLSearchParams(window.location.search);
let postId = params.get('id');

let url = `https://devtorocketg20-default-rtdb.firebaseio.com/posts/${postId}.json`;
let detailPost = document.querySelector('#detailPostView');

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

//! Post Detail
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

/* Document Load*/
document.addEventListener("DOMContentLoaded", (e) => {

    let posts = getDetailPost(url);
    let tags = "";
    if ('tags' in posts) {
        if (posts.tags.length > 0) {
            posts.tags.forEach((tag) => {
                tags += `<a href="#" class="card-link text-decoration-none">#${tag}</a>`;
            })
        }
    }
    detailPost.innerHTML =
        `
        ${posts.urlCoverImage != "" ? '<img src="' + posts.urlCoverImage + '" alt="main-image">' : ""}
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
            <div class="card-content p-0">
                <h1>${posts.title}</h1>
                <div class="d-flex">
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

    //Read next functionality
    readNext();
    document.querySelector("#copy-url-button").dataset.posturl = window.location;
});

let updateProfile = (photo, name) =>{
    document.querySelector("#profileDetailPost .avatar").src = photo;
    document.querySelector(".card-profile-name").innerHTML = name;
    document.querySelector("#profile-name").innerHTML =  name;
}

/*Read next*/
const readNext = () => {
    fetch(`https://devtorocketg20-default-rtdb.firebaseio.com/posts.json`)
    .then((res)=>{
            return res.json();
    }).then((res)=>{
        //print read Next
        printReadNext(res);
    }).catch((error)=>{
        console.log(error);      
    });
}

const printReadNext = (posts) => {
    let template = "";
    let ids = Object.keys(posts);
    let usedId = [];
    
    while(usedId.length < 4)
    {
        //get random number
        let randomIndex = Math.floor(Math.random() * ids.length);
        
        if(ids[randomIndex] != postId && !usedId.includes(randomIndex))
        {
            //get post and print
            template += `
            <a href="detail.html?id=${ids[randomIndex]}">
                <div class="d-flex justify-content-start align-items-center read-next-container">
                    <div class="read-next rounded-circle">
                        <img src="${posts[ids[randomIndex]].avatarAuthor}">
                    </div>
                    <div class="read-text p-3">
                        <h3 class="strong">${posts[ids[randomIndex]].title}</h3>
                        <p>${posts[ids[randomIndex]].author} ${new Date(posts[ids[randomIndex]].createdDate).toLocaleDateString('en-us', dateFormatOptions)}</p>
                    </div>
                </div>
            </a>`;
            usedId.push(randomIndex);
        }        
    }
    document.querySelector("#container-readnext").innerHTML = template;   

}