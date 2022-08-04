const postRead = document.querySelector("#pills-home");
const postLatest = document.querySelector("#pills-profile");
const postTop = document.querySelector("#pills-contact");

const getPosts = (url) => {
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

/**
 * Function to convert Object to Array
 */
 const objectToArray = (posts) => {
    var array = [];

    for (var id in posts) {
         posts[id].postID = id;
         array.push(posts[id]);
    } 
    return array;    
}

const printPosts = (posts) => {
    
    let savedPost = getUserSavedPosts();
    let template = "";

    posts.forEach((post, index) => {
        let countComments = 0;
        // Cover functionality
        let imgPost = "";
        if (index === 0 && post.urlCoverImage != "" ) {
            imgPost = `<img src="${post.urlCoverImage}" alt="main-image">`
        }

        // Tags functionality
        let tags = "";
        if ('tags' in post) {
            if (post.tags.length > 0) {
                post.tags.forEach((tag) => {
                    tags += `<a href="#" class="card-link text-decoration-none">#${tag}</a>`
                });
            }
        } 
        
        //Comments count
        if('comments' in post){            
            for(comment in post.comments)
            {
                countComments++;
            }
        }

        template += `
        <div class="card ${index === 0 ? "" : "p-2 p-md-3 mt-3"}">
        ${imgPost}
        <div class="card-body p-1 p-xl-3">
            <div class="d-flex align-items-center mb-3">
                <div class="main-profile">
                    <img class="rounded-circle" src="${post.avatarAuthor}"
                        alt="profile">
                </div>
                <div class="mx-2 profile-name p-1">
                    <a href="" class="text-decoration-none">${post.author}</a>
                    <p class="post-date my-0">${new Date(post.createdDate).toLocaleDateString('en-us', dateFormatOptions)}</p>
                </div>
            </div>
            <div class="card-content p-0 ps-md-5">
                <h3><a href="detail.html?id=${post.postID}">${post.title}</a></h3>
                <div class="d-flex my-3">
                ${tags}
                </div>
                <div class="main-icons d-flex justify-content-between mb-3">
                    <div class="d-flex justify-content-between card-reactions">
                        <div class="card-reactions-detail">
                            <a href="detail.html?id=${post.postID}" class="text-decoration-none">
                                <svg class="crayons-icon" width="24" height="24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M18.884 12.595l.01.011L12 19.5l-6.894-6.894.01-.01A4.875 4.875 0 0112 5.73a4.875 4.875 0 016.884 6.865zM6.431 7.037a3.375 3.375 0 000 4.773L12 17.38l5.569-5.569a3.375 3.375 0 10-4.773-4.773L9.613 10.22l-1.06-1.062 2.371-2.372a3.375 3.375 0 00-4.492.25v.001z">
                                    </path>
                                </svg>
                                0 <span class="d-none d-md-block">reaction</span>
                            </a>
                        </div>
                        <div class="card-reactions-detail">
                            <a href="detail.html?id=${post.postID}" class="text-decoration-none"><svg
                                    class="crayons-icon" width="24" height="24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10.5 5h3a6 6 0 110 12v2.625c-3.75-1.5-9-3.75-9-8.625a6 6 0 016-6zM12 15.5h1.5a4.501 4.501 0 001.722-8.657A4.5 4.5 0 0013.5 6.5h-3A4.5 4.5 0 006 11c0 2.707 1.846 4.475 6 6.36V15.5z">
                                    </path>
                                </svg>
                                ${countComments}<span class="d-none d-md-block">comments</span>
                            </a>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between card-reactions">
                        <a href="" class="text-decoration-none me-2">${post.mintoread} min</a>
                        <button class="btn btn-secondary btn-save-post" data-postid="${post.postID}">${savedPost.includes(post.postID)? "Saved" : "Save"}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
        
    });  

    return template;
}

document.addEventListener('DOMContentLoaded', (event) => {

    let posts = getPosts("https://devtorocketg20-default-rtdb.firebaseio.com/posts/.json");
    let arrayPost = objectToArray(posts);
    let savedPost = getUserSavedPosts();
    console.log(savedPost)
    //Relevant Post
    postRead.innerHTML = printPosts(arrayPost);        
    postLatest.innerHTML = printPosts(arrayPost.reverse());

    /*Save button*/
    let savePostBtn = document.getElementsByClassName('btn-save-post');
    for (var i = 0; i < savePostBtn.length; i++) {
        savePostBtn[i].addEventListener('click', (event) => {
            savePost(savedPost, event.target.dataset.postid, event);
        });
    }     
    
});

