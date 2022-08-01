//Funcion de click en las reacciones  falta hacer que se guarden en el post de seleccion y no se borren.

const increment = document.querySelector("#heart");
const count = document.querySelector("#reaction-Heart");

increment.addEventListener("click", () => {
    count.innerText = Number(count.innerText) + 1;
    if (count.innerText > 1) {
        count.innerText = 0;
        return count
    };
});

const incrementU = document.querySelector("#unicorn");
const countU = document.querySelector("#reaction-Unicorn");


incrementU.addEventListener("click", () => {
    countU.innerText = Number(countU.innerText) + 1;
    if (countU.innerText > 1) {
        countU.innerText = 0;
        return countU
    };
});


const incrementS = document.querySelector("#save");
const countS = document.querySelector("#reaction-save");


incrementS.addEventListener("click", () => {
    countS.innerText = Number (countS.innerText) + 1;
    if (countS.innerText > 1) {
        countS.innerText = 0;
        return countS
    };
});


// aqui termina la funcion

//!evento de visualizacion del detail post


//nuevo parte
let params = new URLSearchParams(window.location.search)
let postId = params.get('id')

console.log(postId)

let url = `https://devtorocketg20-default-rtdb.firebaseio.com/posts/${postId}.json`
console.log(url)

//! Hacer el request con el metdoo get del post selccionado y isertarla en mi template 

console.log(url)

let cardHolder = document.querySelector('.detailPost')

document.addEventListener("DOMContentLoaded", (e) => {
    let result = getPosts(url)

    console.log(result)
    detailPost.innerHTML =
        `
        <div class="d-flex align-items-center mb-3">
                                <div class="main-profile">
                                    <img class="rounded-circle" src="./assets/images/avatars/meowth.png" alt="profile">
                                </div>
                                <div class="mx-2 profile-name">
                                    <a href="" class="text-decoration-none">${result.author}</a>
                                    <p class="post-date m-0">Jun 16 (4 days Ago)</p>
                                </div>
                            </div>
                            <div class=" card-content p-0">
                                <h1>What was your win this week?</h1>
                                <div class="d-flex">
                                    <a href="#" class="card-link text-decoration-none">#nuevo modulo</a>
                                    <a href="#" class="card-link text-decoration-none">#weekly</a>
                                    <a href="#" class="card-link text-decoration-none">#enjoy</a>
                                </div>
                            </div>
                            <div class="card-post pt-4">

                                <p>Hey there! </p>
                                <p>Looking back on this past week, what was something you were proud of accomplishing?
                                </p>

                                <p>All wins count — big or small 🎉</p>
                                <p>Examples of 'wins' include:</p>

                                <ul>
                                    <li>Starting a new project</li>
                                    <li>Fixing a tricky bug</li>
                                    <li>Attending CodeLand... or whatever else might spark joy ❤️ </li>
                                </ul>

                                <p>Have a wonderful weekend!</p>
                                <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--vIJLV2gv--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/knom1otmggk9ehl57bot.gif"
                                    alt="Elmo dancing around in a party hat over a blue background" loading="lazy"
                                    width="600" height="450" data-animated="true" id="animated-0" class="ff-image">
                            </div>`

})

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
