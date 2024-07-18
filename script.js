

const firebaseConfig = {
    apiKey: "AIzaSyB2FGnrlZsRlObhF_OZvsjxdhiTTjJgYAo",
    authDomain: "datos-de-formulario-48e9d.firebaseapp.com",
    projectId: "datos-de-formulario-48e9d",
    storageBucket: "datos-de-formulario-48e9d.appspot.com",
    messagingSenderId: "642757570609",
    appId: "1:642757570609:web:111bb94961ae0444c66510",
    measurementId: "G-ND58B3KJ2E"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();


document.getElementById('formulario').addEventListener('submit', (event)=>{
    event.preventDefault();

    // validar campo nombre
     let entradaNombre = document.getElementById('name');
     let errorNombre = document.getElementById('nameError');
     if(entradaNombre.value.trim()===''){
        errorNombre.textContent = 'Por favor, introducir nombre '
        errorNombre.classList.add('error_message');
     }else{
        errorNombre.textContent = ''
        errorNombre.classList.remove('error_message');
     }
    //validar correo electronico
    let emailEntrada = document.getElementById('email');
    let errorEmail = document.getElementById('emailError');
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test(emailEntrada.value)){
        errorEmail.textContent = 'Por favor, introducir email '
        errorEmail.classList.add('error_message');
    }else{
        errorEmail.textContent = ''
        errorEmail.classList.remove('error_message');
    }
    // validar la contraseña
    let passwordEntrada = document.getElementById('password');
    let errorPassword = document.getElementById('passwordError');
    if(passwordEntrada.value.length <8){
        errorPassword.textContent = 'Por favor, introducir password mayor igual a 8 caracteres '
        errorPassword.classList.add('error_message');
    }else{
        errorPassword.textContent = ''
        errorPassword.classList.remove('error_message');
    }
    //si todos los campos son validos enviar formulario
    if(!errorNombre.textContent
        &&!errorEmail.textContent
        &&!errorPassword.textContent
    ){
        db.collection("users").add({
            nombre: entradaNombre.value,
            email: emailEntrada.value,
            password: passwordEntrada.value
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });

        alert('el formulario se ha enviado con exito')
        document.getElementById('formulario').reset();
    }

})