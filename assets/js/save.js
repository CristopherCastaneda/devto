
let saveBtn = document.querySelector('.save-button');


let params = new URLSearchParams(window.location.search);
let postId = params.get('postId');

let url = getUser(`https://devtorocketg20-default-rtdb.firebaseio.com/users/-N8FPl8FpG-kETvlEqhg.json`);

url = url.save

document.addEventListener(("DOMContentLoaded"),() => {
    getUser(url)
});


const getUser = (url) => {
    let user = [];
    const postRequest = new XMLHttpRequest();

    postRequest.onload = (data) => {
    
        if (data.target.readyState === 4)   {
            if (
                data.target.status >= 200 ||
                data.target.status <= 399 
                ){
                    user = JSON.parse(data.target.response);                    
            }
            else if (data.target.status === 400)    {
                console.log('sucedio un error')
            }
        }     
    } 

    postRequest.open("GET", url, false);
    postRequest.send();
    return user;
}




user.saved.foreach(idPost) => {

    url = https:`//devtorocketg20-default-rtdb.firebaseio.com/posts/${idPost}.json`)
    post = {}

    fetch(url)
    .then((res)=>{
        
        return 
    })
    .catch((error)=>{
        console.log(error)
    })
    

});








saveBtn.addEventListener('click', (e) => {
    e.preventDefault()

    let iteration = ("")

    iteration.forEach(element => {
        .innerHTML = `
    <div class="col-12 col-md-9 col-lg-10">
     <main class="posts">
        <div class="container">
            <div class="tab-content" id="pills-tabContent">
                <div class="tab-pane fade show active" id="pills-home" role="tabpanel"
                    aria-labelledby="pills-home-tab" tabindex="0">
                    <div class="card p-2 p-md-3 mt-3">
                        <div class="card-body p-1 p-xl-3">
                            <div class="d-flex align-items-center mb-3">
                                <div class="main-profile">
                                    <img class=" img-readingList rounded-circle"
                                        src="./assets/images/avatars/mariana.png" alt="profile">
                                </div>
                                <div class="mx-2 profile-name p-1">
                                    <h3><a href="detail.html">${postId}</a></h3>
                                    <p class="post-date my-0">
                                        <a href="" class="text-decoration-none">Mariana Rechy</a>
                                        - Jun 20 - (3 hours ago) -
                                        <a href="" class="text-decoration-none me-2">3 min read</a>
                                        <a href="#" class="card-link text-decoration-none">#code</a>
                                        <a href="#" class="card-link text-decoration-none">#discuss</a>
                                        <a href="#" class="card-link text-decoration-none">#programming</a>
                                    </p>
                                </div>
                                <div class=" readingListBtn d-flex align-self-end">
                                    <button class="archive-button btn btn-secondary">Archive</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>     
    `
        return iteration;
    });

});




