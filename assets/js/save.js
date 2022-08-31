document.addEventListener(("DOMContentLoaded"), async () => {
    try{
        const response = await fetch(`${APIURL}users/${tokenUserID}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json"
            }
        });
      
        const user = await response.json(); 
        document.querySelector(".radingListPost").innerHTML = await printSavedPost(user.data.user.savedPost);
    }
    catch(error){
        console.log(error);
    }
    //printSavedPost()
});

const printSavedPost = async (savedPost) => {
         
    let template = "";
    try{

        let index = 0;
        for (const postId of savedPost) {
            if (postId != null || postId != "" || postId != "null"){
            
                const response = await fetch(`${APIURL}posts/${postId}`, {
                    method: "GET",
                    headers: {
                    "Content-Type": "application/json"
                    }
                });
          
            const post = await response.json();   
            const postData = post.data.post;
            let tags = ""; 
            
            if ('tags' in postData) { 
                if (postData.tags.length > 0) {
                    postData.tags.forEach((tag) => {
                        tags += `<a href="#" class="card-link text-decoration-none">#${tag}</a>`
                    });
                }
            }
            template += `
                <div class="card p-2 p-md-3 ${index == 0 ? "" : " mt-4"}">
                        <div class="card-body p-1 p-xl-3">
                            <div class="d-flex align-items-center justify-content-between mb-3">
                                <div class=" d-flex align-items-center">
                                <div class="main-profile">
                                    <img class=" img-readingList rounded-circle"
                                        src="${postData.user.profile_photo}"alt="profile">
                                </div>
                                <div class="mx-2 profile-name p-1">
                                    <h3><a href="detail.html?id=${postId}">${postData.post_title}</a></h3>
                                    <p class="post-date my-0">
        
                                        <strong>
                                        <a href=""class="text-decoration-none">${postData.user.user_name}</a>
                                        </strong>
                                        <span>•</span>
                                        <a href="" class="text-decoration-none text-color">${new Date(postData.post_date).toLocaleDateString('en-us', dateFormatOptions)}</a>
                                        <span>•</span>
                                        <a href="" class="text-decoration-none text-color">${postData.read_time} min read</a>
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
            `;
            }
        index++;    
        }
        
    }
    catch(error){
        console.log(error);
    }

    return template;

}

