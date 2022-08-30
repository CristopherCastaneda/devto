// Selectores
const btnLogin = document.querySelector("#btn-continue-login");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");


// OnClick
btnLogin.addEventListener("click", async (event)  => {
  event.preventDefault();

  console.log("email :", emailInput.value);
  console.log("password :", passwordInput.value);

  const data = {
    email: emailInput.value,
    password: passwordInput.value
  };

  // Fetch
  const response = await fetch(`${APIURL}auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const jsonData = await response.json();

  if(!jsonData.success) {
    alert("Ingresaste mal tus datos")
  } else {
    localStorage.setItem("token", jsonData.data.token);
    window.location.href = "./index.html";
  }
});