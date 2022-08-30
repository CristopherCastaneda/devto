// Selectores
const btnCreateAccount = document.querySelector("#btn-create");
const nameUser = document.querySelector("#name-user");
const locationUser = document.querySelector("#location-user");
const educationUser = document.querySelector("#education-user");
const emailUser = document.querySelector("#email-user");
const passwordUser = document.querySelector("#password-user");
const descriptionUser = document.querySelector("#description-user");
const btnAddImg = document.querySelector("#btn-add-photo");


// Constants
const URL = "http://localhost:8080/users"
// OnClick
btnCreateAccount.addEventListener("click", async (event) => {
    event.preventDefault();
    console.log("hola")
    const data = {
    user_name: nameUser.value,
    location: locationUser.value,
    education: educationUser.value,
    registration_date: new Date(),
    email: emailUser.value,
    password: passwordUser.value,
    description: descriptionUser.value,
    savedPost: [],
    profile_photo: "./assets/images/avatars/meowth.png",
    };

    // Fetch
    const response = await fetch(URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const jsonData = await response.json()
    console.log(jsonData)
    // No fue exitoso, no estas autorizado
    if (!jsonData.success) {
        alert("Ingresaste mal tus datos")
    } else {
        // Si estas autorizado
        // LocalStorage
        localStorage.setItem("token", jsonData.data.token)

        // Navegar
        window.location.href = "./index.html"
    };
});