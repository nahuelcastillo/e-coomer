//Todos los elementos input
document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(localStorage.getItem("userDetails"))
  let email = document.getElementById("email")

  email.setAttribute("value", `${user.email}`)

  var forms = document.querySelectorAll('.needs-validation')

  // Bucle sobre ellos y evitar el envío
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
          getUserDetails()
        }

        form.classList.add('was-validated')
      }, false)
    })

    loadUserDetailsIntoForm();
});


function getUserDetails(){
  let name = document.getElementById("first-name")
  let secondName = document.getElementById("second-name")
  let lastname = document.getElementById("first-lastname")
  let secondLastname = document.getElementById("second-lastname")
  let phone = document.getElementById("phone")
  let email = document.getElementById("email")
  

  const userDetails = {
    firstName: name.value,
    secondName: secondName.value,
    firstLastname: lastname.value,
    secondLastname: secondLastname.value,
    email: email.value,
    phone: phone.value,
  };


  localStorage.setItem("userDetails", JSON.stringify(userDetails));  
}

function loadUserDetailsIntoForm() {
  const user = JSON.parse(localStorage.getItem("userDetails"));

  if (user) {
  document.getElementById("first-name").setAttribute("value",`${user.firstName}`)
  document.getElementById("second-name").setAttribute("value",`${user.secondName}`)
  document.getElementById("first-lastname").setAttribute("value",`${user.firstLastname}`)
  document.getElementById("second-lastname").setAttribute("value",`${user.secondLastname}`)
  document.getElementById("phone").setAttribute("value",`${user.phone}`)
  }
}


document.addEventListener('DOMContentLoaded', function () {
  const input = document.getElementById('input-image');
  const image = document.getElementById('profile-image');

  // Cargar la imagen almacenada en el almacenamiento local al cargar la página
  const storedImage = localStorage.getItem('savedImage');
  if (storedImage) {
    image.src = storedImage;
  } else {
    // Si no hay imagen almacenada, mostrar la imagen por defecto
    image.src = 'img/img_perfil.png';
  }

  input.addEventListener('change', function (event) {
    const file = input.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = function (e) {
        // Mostrar la imagen seleccionada
        image.src = e.target.result;

        // Guardar la imagen en el almacenamiento local
        localStorage.setItem('savedImage', e.target.result);
      };

      reader.readAsDataURL(file);
    } else {
      // Si el usuario no selecciona una imagen, mostrar la imagen por defecto
      image.src = 'img/img_perfil.png';

      // Eliminar la imagen almacenada en el almacenamiento local
      localStorage.removeItem('savedImage');
    }
  });
});