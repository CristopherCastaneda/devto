const postRead = document.querySelector("#pills-home")

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

const printPosts = () => {
    let posts = getPosts("https://devtorocketg20-default-rtdb.firebaseio.com/posts/.json");
    console.log(posts)
    let template = "";
    let countPosts = 0;
   
    
    for (let post in posts) {
        let imgPost = "";
        if (countPosts === 0) {
            imgPost = `<img src="${posts[post].urlCoverImage}" alt="main-image">`
        }
        let tags = "";
        if ('tags' in posts[post]) {
            if (posts[post].tags.length > 0) {
                posts[post].tags.forEach((tag) => {
                    tags += `<a href="#" class="card-link text-decoration-none">#${tag}</a>`
                });
            }
        }        
    
        template += `
        <div class="card ${countPosts === 0 ? "" : "p-2 p-md-3 mt-3"}">
        ${imgPost}
        <div class="card-body p-1 p-xl-3">
            <div class="d-flex align-items-center mb-3">
                <div class="main-profile">
                    <img class="rounded-circle" src="${posts[post].avatarAuthor}"
                        alt="profile">
                </div>
                <div class="mx-2 profile-name p-1">
                    <a href="" class="text-decoration-none">${posts[post].author}</a>
                    <p class="post-date my-0">${posts[post].createdDate}</p>
                </div>
            </div>
            <div class="card-content p-0 ps-md-5">
                <h3><a href="detail.html?id=${post}">${posts[post].title}</a></h3>
                <div class="d-flex my-3">
                ${tags}
                </div>
                <div class="main-icons d-flex justify-content-between mb-3">
                    <div class="d-flex justify-content-between card-reactions">
                        <div class="card-reactions-detail">
                            <a href="" class="text-decoration-none">
                                <svg class="crayons-icon" width="24" height="24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M18.884 12.595l.01.011L12 19.5l-6.894-6.894.01-.01A4.875 4.875 0 0112 5.73a4.875 4.875 0 016.884 6.865zM6.431 7.037a3.375 3.375 0 000 4.773L12 17.38l5.569-5.569a3.375 3.375 0 10-4.773-4.773L9.613 10.22l-1.06-1.062 2.371-2.372a3.375 3.375 0 00-4.492.25v.001z">
                                    </path>
                                </svg>
                                12 <span class="d-none d-md-block">reaction</span>
                            </a>
                        </div>
                        <div class="card-reactions-detail">
                            <a href="" class="text-decoration-none"><svg
                                    class="crayons-icon" width="24" height="24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M10.5 5h3a6 6 0 110 12v2.625c-3.75-1.5-9-3.75-9-8.625a6 6 0 016-6zM12 15.5h1.5a4.501 4.501 0 001.722-8.657A4.5 4.5 0 0013.5 6.5h-3A4.5 4.5 0 006 11c0 2.707 1.846 4.475 6 6.36V15.5z">
                                    </path>
                                </svg>
                                0<span class="d-none d-md-block">comments</span>
                            </a>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between card-reactions">
                        <a href="" class="text-decoration-none me-2">3 min read</a>
                        <button class="btn btn-secondary">Save</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
    countPosts++;
    }
    return template;

}

postRead.innerHTML = printPosts();

// ! GET 
// let url =("https://devtorocketg20-default-rtdb.firebaseio.com/posts/.json")

// fetch(url)
// .then((res)=>{
//     console.log(res)
//     return res.json()
// })
// .then((res)=>{
// ? logica 
// })
// .catch((error)=>{
//     console.log(error)
// })

// let tagHTML = tags.reduce((html, tag) => {
//     html += `<span class="badge bg-primary me-2">${tag}</span>`;
//     return html;
// }, "");
