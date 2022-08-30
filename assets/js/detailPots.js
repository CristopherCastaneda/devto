let params = new URLSearchParams(window.location.search);
let postId = params.get('id');

let detailPost = document.querySelector('#detailPostView');
let savedReaction = document.querySelector(".reaction-button-save");

//! Post Detail
const getDetailPost = async (url) => {
    try{
        const response = await fetch(`${APIURL}post/${postId}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json"
            }
        });
        
        const posts = await response.json();  
        return posts.data.post;
    }
    catch(error){
        console.log(error);
    }
}

/* Document Load*/
document.addEventListener("DOMContentLoaded", async (e) => {

    let posts = await getDetailPost();    
    let tags = "";
    let editPost= posts.author;
    
    let btnEditPost="";
    
        
        btnEditPost += `<div class="btnEditPost">
                            <a href="./editPost.html?id=${postId}" class="btn px-2">Edit</a>
                            <button type="button" class="btn btn-danger px-2 btn-delete-post">Delete</button>
                            <a href="" class="btn px-2">stat</a>
                        </div>`;
    
     
    if ('tags' in posts) {
        if (posts.tags.length > 0) {
            tags += `<div class="d-flex">`;
            posts.tags.forEach((tag) => {               
                tags += `<a href="#" class="card-link text-decoration-none">#${tag}</a>`;                
            });
            tags += "</div>";
        }
    }
    detailPost.innerHTML =
        `
        ${posts.post_banner == '' ? "" : '<img src="' + posts.post_banner + '" alt="main-image">' }        
        <div class="card-body p-3 p-md-5 ">
        <div class="d-flex justify-content-between mb-3">
            <div class="d-flex align-items-center mb-3">
                <div class="main-profile">
                    <img class="rounded-circle" src="${posts.user.profile_photo}" alt="profile">
                </div>
                <div class="mx-2 profile-name">
                    <a href="" class="text-decoration-none">${posts.user.user_name}</a>
                    <p class="post-date m-0">${new Date(posts.post_date).toLocaleDateString('en-us', dateFormatOptions)}</p>
                </div>
                
        </div>
            <div>
                ${btnEditPost}
            </div>
                </div>
            
            <div class="card-content p-0">
                <h1>${posts.post_title}</h1>
                <div>
                    ${tags}
                </div>
            </div>
            <div class="card-post pt-4">
                ${posts.post_body}
            </div>
        </div>
        `;
    //Update profile
    updateProfile(posts.user);
    if ('comments' in posts) {
        printComments(posts.comments);
    }

    //Read next functionality
    readNext();
    document.querySelector("#copy-url-button").dataset.posturl = window.location;

    let btnDeletePost = document.querySelector(".btn-delete-post");

    if (btnDeletePost != null) {
        btnDeletePost.addEventListener("click", async () => {
            let response = confirm("Are you sure you want to delete this article?\n You cannot undo this action");
            if (response) {
                try{
                    const response = await fetch(`${APIURL}post/${postId}`, {
                        method: "DELETE"                        
                    });
                    
                    const posts = await response.json();
                    
                    setTimeout(
                        function () {
                            window.location = "/index.html"
                        },
                        1500);
                }
                catch(error){
                    console.log(error);
                }               
            }
        });
    }

    /*Saved*/
    let savedPost = getUserSavedPosts();
    if(savedPost.includes(postId)){
        savedReaction.classList.add("active");
        document.querySelector(".path-saved").classList.remove("d-none");
        document.querySelector("#reaction-save").innerHTML = 1;
    }
    
});

let updateProfile = (user) =>{
    document.querySelector("#profileDetailPost .avatar").src = user.profile_photo;
    document.querySelector(".card-profile-name").innerHTML = user.user_name;
    document.querySelector("#profile-name").innerHTML =  user.user_name;
    document.querySelector("#user-location").innerHTML =  user.location;
    document.querySelector("#user-education").innerHTML =  user.education;
    document.querySelector("#user-registration-date").innerHTML =  new Date(user.registration_date).toLocaleDateString('en-us', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
}

/*Read next*/
const readNext = async () => {
    try{
        const response = await fetch(`${APIURL}post`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json"
            }
        });
        
        const posts = await response.json();    
        printReadNext(posts.data.posts);
    }
    catch(error){
        console.log(error);
    }
}

const printReadNext = (posts) => {
    let template = "";
    let usedId = [];
    let maxPost = posts.length > 4 ? 4 : posts.length-1;
    console.log(maxPost)
    while(usedId.length < maxPost)
    {
        //get random number
        let randomIndex = Math.floor(Math.random() * posts.length);
        
        if(posts[randomIndex]._id != postId && !usedId.includes(randomIndex))
        {
            
           //get post and print
            template += `
            <a href="detail.html?id=${posts[randomIndex]}">
                <div class="d-flex justify-content-start align-items-center read-next-container">
                    <div class="read-next rounded-circle">
                        <img src="${posts[randomIndex].user.profile_photo}">
                    </div>
                    <div class="read-text p-3">
                        <h3 class="strong">${posts[randomIndex].post_title}</h3>
                        <p>${posts[randomIndex].user.user_name} ${new Date(posts[randomIndex].post_date).toLocaleDateString('en-us', dateFormatOptions)}</p>
                    </div>
                </div>
            </a>`;
            usedId.push(randomIndex);
        }        
    }
    document.querySelector("#container-readnext").innerHTML = template;

}

//! Events
savedReaction.addEventListener("click", (event) => {
    toggle(savedReaction, "active");
    toggle(document.querySelector(".path-saved"), "d-none");

    let savedPost = getUserSavedPosts();

    //remove/add from saved list
    if(savedPost.includes(postId)){
        //delete savedPost[savedPost.indexOf(postID)]
        var index = savedPost.indexOf(postId);
        if (index !== -1) {
            savedPost.splice(index, 1);
        }
        document.querySelector("#reaction-save").innerHTML = 0;
    }
    else{
        savedPost.push(postId);
        document.querySelector("#reaction-save").innerHTML = 1;
    }
    // Patch
    updateUser(savedPost);
});