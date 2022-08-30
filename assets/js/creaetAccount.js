// Selectores
const btnCreateAccount = document.querySelector("#btn-create");
const nameUser = document.querySelector("#name-user");
const locationUser = document.querySelector("#location-user");
const educationUser = document.querySelector("#education-user");
const emailUser = document.querySelector("#email-user");
const passwordUser = document.querySelector("#password-user");
const descriptionUser = document.querySelector("#description-user");
const btnAddImg = document.querySelector("#btn-add-photo");
let cover = "";
// Firebase Init
firebase.initializeApp(firebaseConfig);

// OnClick
btnCreateAccount.addEventListener("click", async (event) => {
    event.preventDefault();

    //create user data
    const data = {
        user_name: nameUser.value,
        location: locationUser.value,
        education: educationUser.value,
        registration_date: new Date(),
        email: emailUser.value,
        password: passwordUser.value,
        description: descriptionUser.value,
        savedPost: [],
        profile_photo: cover || "./assets/images/avatars/dummy.png"
    };

    // Fetch
    const response = await fetch(`${APIURL}users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const jsonData = await response.json();
    
    if (!jsonData.success) {
        alert("Ingresaste mal tus datos");
    } else {
        //Execute login
        const data = {
            email: emailUser.value,
            password: passwordUser.value
          };
        
          // Fetch
          const responseLogin = await fetch(`${APIURL}auth`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          });
        
          const jsonResponse = await responseLogin.json();
        
          if(jsonResponse.success) {
            localStorage.setItem("token", jsonResponse.data.token);
            window.location.href = "./index.html";
          }        
    };
});

document.querySelector(".btn-cover-post").addEventListener("click", () =>{
    btnAddImg.click();
});

btnAddImg.addEventListener("change", ()=>{
    //spinner
    document.querySelector(".btn-cover-post").innerHTML = `<div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>`;
    uploadImage();
});

const uploadImage = () => {
    const ref = firebase.storage().ref();
    const file = btnAddImg.files[0];
    const name = +new Date() + "-" + file.name;
    const metadata = {
      contentType: file.type
    };
    const task = ref.child(name).put(file, metadata);

    task
      .then(snapshot => {
        return snapshot.ref.getDownloadURL();
      })
      .then(url => {      
        cover = url;  
        document.querySelector("#preview-image").src = url;
        document.querySelector(".btn-cover-post").textContent  = `Change`;
      })
      .catch(console.error);
}