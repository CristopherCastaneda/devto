
const get = (url) => {
    let user = [];
    const postRequest = new XMLHttpRequest();

    postRequest.onload = (data) => {

        if (data.target.readyState === 4) {
            if (
                data.target.status >= 200 ||
                data.target.status <= 399
            ) {
                user = JSON.parse(data.target.response);
            }
            else if (data.target.status === 400) {
                console.log('sucedio un error')
            }
        }
    }

    postRequest.open("GET", url, false);
    postRequest.send();
    return user;
}




document.addEventListener(("DOMContentLoaded"),() => {
    printSavedPost()
});

const printSavedPost = () => {
            
    let template = "";
    let userData = get(`https://devtorocketg20-default-rtdb.firebaseio.com/users/-N8aKUfGWMxVfZEePuh2.json`);
    userData.saved.forEach((postId) => {
       
        if (postId != null || postId != "" || postId != "null"){
            console.log(postId)   
        let postData = get(`https://devtorocketg20-default-rtdb.firebaseio.com/posts/${postId}.json`);   

        let tags = ""; 
        
    if ('tags' in postData) { 
    if (postData.tags.length > 0) {
        postData.tags.forEach((tag) => {
            tags += `<a href="#" class="card-link text-decoration-none">#${tag}</a>`
        });
    }
    }
        template += `
        <div class="posts">
                    <div class="container">
                        <div class="tab-content" id="pills-tabContent">
                            <div class="tab-pane fade show active" id="pills-home" role="tabpanel"
                                aria-labelledby="pills-home-tab" tabindex="0">
                                <div class="card p-2 p-md-3 mt-4">
                                    <div class="card-body p-1 p-xl-3">
                                        <div class="d-flex align-items-center justify-content-between mb-3">
                                            <div class=" d-flex align-items-center">
                                            <div class="main-profile">
                                                <img class=" img-readingList rounded-circle"
                                                    src="${postData.avatarAuthor}"alt="profile">
                                            </div>
                                            <div class="mx-2 profile-name p-1">
                                                <h3><a href="detail.html?id=${postId}">${postData.title}</a></h3>
                                                <p class="post-date my-0">

                                                    <strong>
                                                    <a href=""class="text-decoration-none">${postData.author}</a>
                                                    </strong>
                                                    <span>•</span>
                                                    <a href="" class="text-decoration-none text-color">${postData.createdDate}</a>
                                                    <span>•</span>
                                                    <a href="" class="text-decoration-none text-color">${postData.mintoread} min read</a>
                                                    <span>•</span>
                                                    ${tags}
                                                </p>
                                            </div>
                                        </div>
                                            <div class="readingList">
                                                <button class="archive-button btn btn-light d-flex aligne-self-end">Archive</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
     `;
    }
    });

    document.querySelector(".radingListPost").innerHTML = template;

    return printSavedPost;
}

