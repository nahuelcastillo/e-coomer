let bttDark = document.getElementById("darkcheck");

document.addEventListener("DOMContentLoaded", () => {
  // Si en el localStorage hay un item theme que tiene el string "dark" el estado del checkbox se pone como tildado
  bttDark.checked = localStorage.getItem("theme") === "dark" ? true : false;
  // Vemos si en el localStorage tenemos un item theme y según si tiene "dark" o "light" le ponemos ese valor al atributo de bootstrap data-bs-theme
  document
    .querySelector("html")
    .setAttribute("data-bs-theme", localStorage.getItem("theme"));

  // Agregamos un evento que escucha cuando cambiar el checkbox
  bttDark.addEventListener("change", (event) => {
    // Guardamos en el item theme dependiendo de si el btn está checked guardamos "dark" y si no esta checked guardamos "light"
    localStorage.setItem("theme", event.target.checked ? "dark" : "light");
    if (localStorage.getItem("theme") === "dark" && event.target.checked) {
      document.querySelector("html").setAttribute("data-bs-theme", "dark");
    } else {
      document.querySelector("html").setAttribute("data-bs-theme", "light");
    }
  });
});
