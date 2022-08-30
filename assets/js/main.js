const token = localStorage.getItem("token") || "";
let tokenUserID = "";
const userMenu = document.querySelector(".user-menu");
const userAvatar = document.querySelector(".user-avatar");
const userLogin = document.querySelector(".user-login");
const userLogged = document.querySelector(".user-logged");
const userNameDisplay = document.querySelector("#user-name-display");
const userNameUser = document.querySelector("#user-name-user");
const btnSignOut = document.querySelector(".btn-sign-out");
const readingListLink = document.querySelector(".reading-list-link");
const dateFormatOptions = { month: 'short', day: 'numeric' };
const btnSearchD = document.querySelector("#btn-desktop-search");
const btnSearchM = document.querySelector("#btn-mobile-search");
const inputSearchD = document.querySelector("#input-desktop-search");
//Firebase storage
const firebaseConfig = {
  apiKey: "AIzaSyBEIxH2FAp5AFQsgrJL3BEKJmKnEyrbM1U",
  authDomain: "devtorocketg20.firebaseapp.com",
  databaseURL: "https://devtorocketg20-default-rtdb.firebaseio.com",
  projectId: "devtorocketg20",
  storageBucket: "devtorocketg20.appspot.com",
  messagingSenderId: "922740208168",
  appId: "1:922740208168:web:e073479da552b0f27ebb1d"
};

const APIURL = "dev-devto-backend-nine.vercel.app/";
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
const getUserSavedPosts = async () => {
  try{
      if(tokenUserID > 0){
        const response = await fetch(`${APIURL}users/${tokenUserID}`, {
            method: "GET",
            headers: {
            "Content-Type": "application/json"
            }
        });
    
        const user = await response.json(); 
        let userPost = user.data.user;
        return userPost.savedPost;
      }       
  }
  catch(error){
    console.log(error);
  }
  return [];
}

//Display count on reading list
document.addEventListener('DOMContentLoaded', async () => {
  let savedPost = await getUserSavedPosts();
  
  let reading = document.querySelectorAll(".bg-reading");
  
  if (reading) {
    for (var i = 0; i < reading.length; i++) {
      reading[i].innerHTML = savedPost.length;
    }
  }
});


/**
 * Save Post functionality
 */
 const savePost = (savedPost, postID, event) => {
  
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

const updateUser = async (saved) => {
    try{
      const user = {
        savedPost: saved
      }    
    const responsePost = await fetch(`${APIURL}users/${tokenUserID}`, {
      method: "PATCH",
      headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(user)
  });
  
  const post = await responsePost.json();
    }
    catch(error){
      console.log(error);
    }
}


//Search functionality
if(btnSearchD != null){
  btnSearchD.addEventListener("click", (event) => {
    event.preventDefault();
    let searchString = document.querySelector("#input-desktop-search").value;  
    console.log(searchString)
    if(searchString){
      window.location = `search.html?q=${searchString}`;
    }

  });
}

if(btnSearchM != null){
  btnSearchM.addEventListener("click", (event) => {
    event.preventDefault();
    let searchString = document.querySelector("#input-mobile-search").value; 
    if(searchString){
      window.location = `search.html?q=${searchString}`;
    } 
  });
}

if(inputSearchD){
  inputSearchD.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      btnSearchD.click();
    }
  });
}

const fillUserData = async () => {
    
  const response = await fetch(`${APIURL}users/${tokenUserID}`, {
      method: "GET",
      headers: {
      "Content-Type": "application/json"
      }
  });
  
  const user = await response.json(); 
  let userData = user.data.user;
  if(userNameDisplay){
    userNameDisplay.innerHTML = userData.user_name;
  }
  if(userNameUser){
    userNameUser.innerHTML = userData.email;
  }
  if(userAvatar){
    userAvatar.src = userData.profile_photo;
  }
}

if(token){
  if(userLogin){
    userLogin.classList.add("d-none");
  }   
  //get user ID
  const payload = token.split(".")[1];
  tokenUserID = JSON.parse(atob(payload)).id;  
  //Fill user data
  fillUserData();

  btnSignOut.addEventListener("click", () => {
    localStorage.removeItem('token');
    window.location.href = "./index.html"
  });
}
else{
  if(userLogged){
    userLogged.classList.add("d-none");
  }  
  if(readingListLink){
    readingListLink.classList.add("d-none");
  }
}

