let userMenu = document.querySelector(".user-menu");
const dateFormatOptions = { month: 'short', day: 'numeric' };

//! Functions

/**
 * Toggle Class
 */
 const toggle = (selector, toggleClass ) => {
    if (selector.classList.contains(toggleClass)) {
        selector.classList.remove(toggleClass);
      } else {
        selector.classList.add(toggleClass);
      }
}


if(userMenu != null){
  userMenu.addEventListener("click", (event) => {
    event.preventDefault();
    toggle(document.querySelector(".user-menu-popover"), "d-none");    
  });
}

/*Get user */
const getUserSavedPosts = () => {
  const httRequest = new XMLHttpRequest()

  let result;
  httRequest.onload = (data) => {
      result = JSON.parse(data.target.responseText)
  }

  httRequest.open("GET", "https://devtorocketg20-default-rtdb.firebaseio.com/users/-N8aKUfGWMxVfZEePuh2.json", false)
  
  httRequest.send()
  
  if('saved' in result)
  { return result.saved; }
  
  return [];    
}

//Display count on reading list
document.addEventListener('DOMContentLoaded', (event) => {
  let savedPost = getUserSavedPosts();
  
  let reading = document.querySelectorAll(".bg-reading");
  
  if (reading != null) {
    for (var i = 0; i < reading.length; i++) {
      reading[i].innerHTML = savedPost.length;
    }
  }
});


/**
 * Save Post functionality
 */
 const savePost = (savedPost, postID, event) => {
  console.log(savedPost)
  if(savedPost.includes(postID)){
      //delete savedPost[savedPost.indexOf(postID)]
      var index = savedPost.indexOf(postID);
      if (index !== -1) {
          savedPost.splice(index, 1);
      }
      event.target.innerHTML = "Save";
  }
  else{
      savedPost.push(postID);
      event.target.innerHTML = "Saved";
  }
  // Patch
  updateUser(savedPost);
}

const updateUser = (saved) => {
  const user = {
      saved: saved
  }    
  fetch('https://devtorocketg20-default-rtdb.firebaseio.com/users/-N8aKUfGWMxVfZEePuh2.json', {method: "PATCH",body: JSON.stringify(user),headers: {"Content-type": "application/json; charset=UTF-8"}})
  .then((res)=>{
          return res.json();
  }).then((res)=>{
          console.log(res);
  }).catch((error)=>{
      console.log(error);      
  });
}
