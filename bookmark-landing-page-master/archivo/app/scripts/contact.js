
const email = document.getElementById('email');
const emailBox = email.parentElement;
const button = document.getElementById('contact-button');
let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

button.addEventListener('click', (e)=>{
    e.preventDefault();

    if(validEmail()){
        alert('Mail recibido');
    }
})

email.addEventListener('keyup', ()=>{
    if (email.value.match(pattern)){
        emailBox.classList.remove('error')
    }
    else{
        emailBox.classList.add('error');
    }
})

function validEmail(){
    if (email.value.match(pattern)){
        emailBox.classList.remove('error')
        return true;
    }
    else{
        emailBox.classList.add('error');
    }
}



