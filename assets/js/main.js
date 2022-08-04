let userMenu = document.querySelector(".user-menu");

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
