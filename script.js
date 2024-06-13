const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("senha");
const passwordConfirmation = document.getElementById("password-confirmation");

form.addEventListener("submit", (e) => {
    e.preventDefault(); // Não permite recarregar a página quando o botão é clicado.
    checkInputs();
})

function checkInputs() {
    let flag;
    const usernameValue = username.value;
    const emailValue = email.value;
    const passwordValue = password.value;
    const passwordConfirmationValue = passwordConfirmation.value;

    if (usernameValue === '') {
        setErrorFor(username, "O nome de usuário é obrigatório.");
        flag = 0;
    } else {
        setSuccessFor(username);
        flag = 1;
    }

    if (emailValue === '') {
        setErrorFor(email, "O email é obrigatório.");
        flag = 0;
    } else if (!checkEmail(emailValue)) {
        setErrorFor(email, "Informe um email válido.");
        flag = 0;
    } else {
        setSuccessFor(email);
        flag = 1;
    }

    if (passwordValue === '') {
        setErrorFor(password, "A senha é obrigatória.");
        flag = 0;
    } else if (passwordValue.length < 7) {
        setErrorFor(password, "A senha precisa conter no mínimo 7 caracteres.");
        flag = 0;
    } else {
        setSuccessFor(password);
        flag = 1;
    }

    if (passwordConfirmationValue === '') {
        setErrorFor(passwordConfirmation, "A confirmação é obrigatória.");
        flag = 0;
    } else if (passwordConfirmationValue != passwordValue) {
        setErrorFor(passwordConfirmation, "As senhas não conferem.");
        flag = 0;
    } else {
        setSuccessFor(passwordConfirmation);
        flag = 1;
    }

    const formControls = form.querySelectorAll("form-control");
    const formIsValid = [...formControls].every((formControl) => {
        return (formControl.className = "form-control success");
    })

    if (formIsValid && flag == 1) {
        alert("O formulário está 100% validado!");
    } else {
        alert("O formulário não foi validado!");
    }
}

function setErrorFor(input, message) {
    const formControl = input.parentElement; // Retorna o pai do input username
    const small = formControl.querySelector("small");

    // Adiciona a mensagem de erro
    small.innerText = message;

    // Adiciona a classe de erro
    formControl.className = "form-control error";
}

function setSuccessFor(input) {
    const formControl = input.parentElement; // Retorna o pai do input username

    // Adiciona a classe de sucesso ao form-control
    formControl.className = "form-control success";
}

function checkEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
    );
}