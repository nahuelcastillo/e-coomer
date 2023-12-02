document.addEventListener("submit", function () {
  const userEmail = document.getElementById("emailInput").value;

  const userDetails = {
    firstName: null,
    secondName: null,
    firstLastname: null,
    secondLastname: null,
    email: userEmail,
    phone: null,
  };

  localStorage.setItem("userDetails", JSON.stringify(userDetails));
});
