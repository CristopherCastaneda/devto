let params = new URLSearchParams(window.location.search);
let searchParam = params.get('q');

document.querySelector(".search-query").innerHTML = searchParam;
document.querySelector("#input-desktop-search").value =searchParam;
document.querySelector("#input-mobile-search").value = searchParam;

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


document.addEventListener(("DOMContentLoaded"),() => {
    printSearchdPost();
});
const printSearchdPost = async () => {
    try {
        let search = `?q=${searchParam}`;
        let savedPost = await getUserSavedPosts();
        let template = "";      

        const response = await fetch(`${APIURL}posts${search}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
        });
        
        const posts = await response.json();
        let arrPosts=objectToArray(posts.data.posts);
        
        arrPosts.forEach((post, index) => {
            let countComments = 0;  
    
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
            <div class="card-body p-1 p-xl-3">
                <div class="d-flex align-items-center mb-3">
                    <div class="main-profile">
                        <img class="rounded-circle" src="${post.user.profile_photo}"
                            alt="profile">
                    </div>
                    <div class="mx-2 profile-name p-1">
                        <a href="" class="text-decoration-none">${post.user.user_name}</a>
                        <p class="post-date my-0">${new Date(post.post_date).toLocaleDateString('en-us', dateFormatOptions)}</p>
                    </div>
                </div>
                <div class="card-content p-0 ps-md-5">
                    <h3><a href="detail.html?id=${post._id}">${post.post_title}</a></h3>
                    <div class="d-flex my-3">
                    ${tags}
                    </div>
                    <div class="main-icons d-flex justify-content-between mb-3">
                        <div class="d-flex justify-content-between card-reactions">
                            <div class="card-reactions-detail">
                                <a href="detail.html?id=${post._id}" class="text-decoration-none">
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
                                <a href="detail.html?id=${post._id}" class="text-decoration-none"><svg
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
                            <a href="" class="text-decoration-none me-2">${post.read_time} min</a>
                            <button class="btn btn-secondary btn-save-post" data-postid="${post._id}">${savedPost.includes(post._id)? "Saved" : "Save"}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
            
        });  
        document.querySelector("#search-container").innerHTML = template;
        
    }
    catch(error){
        console.log(error);
    }     
}
