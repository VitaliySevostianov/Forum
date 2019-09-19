'use strict';
let tab = document.querySelectorAll('button'),
    buttons =  document.querySelectorAll('button'),
    formContent = document.querySelectorAll('.registration-form'),
    points = document.querySelectorAll('.progress-point'),
    email = document.querySelector('#mail'),
    login = document.querySelector('#login'),
    password = document.querySelector('#password'),
    checkPassword = document.querySelector('#repeat_password'),
    birthDay = document.querySelector('#birth_day'),
    birthMonth = document.querySelector('#birth_month'),
    birthYear = document.querySelector('#birth_year'),
    birthDate = document.querySelector('#birth_date');


let emailAlert = document.createElement('div'),
    loginAlert =document.createElement('div'),
    passwordAlert =document.createElement('div'),
    birthAlert =document.createElement('div');

let inputsArr = [email, login, password, checkPassword, birthDate];

let userInfo= {
    email: '',
    login: '',
    password: '',
    birthDate: ''
};

let json,
    registrationConfirm;

window.addEventListener('DOMContentLoaded', () => {
    registrationConfirm = confirm("Уже зарегистрированы?");
    console.log(registrationConfirm);
});

function setInactivePoint(a){
    for(let i = a; i < points.length; i++){
        points[i].classList.remove("active");
        points[i].classList.add("inactive");
    }
}
setInactivePoint(1);
function setActivePoint(a) {
    if(points[a].classList.contains("inactive")){
        points[a].classList.remove("inactive");
        points[a].classList.add("active");
    }
}


function hideTabContent(a){
    for(let i = a; i < formContent.length; i++){
        formContent[i].classList.remove("show");
        formContent[i].classList.add("hidden");
    }
}
hideTabContent(1);
function showTabContent(a){
    if(formContent[a].classList.contains("hidden")){
        formContent[a].classList.remove("hidden");
        formContent[a].classList.add("show");
    }
}


function alertCleaner(){
    emailAlert.classList = "";
    loginAlert.classList = "";
    passwordAlert.classList = "";
    birthAlert.classList = "";
    emailAlert.textContent = "";
    loginAlert.textContent = "";
    passwordAlert.textContent = "";
    birthAlert.textContent = "";
}


function isMailValid(email) {
    
    let reg = email.value.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i);
    if(reg != null && reg != ''){
        return true;
    }else{
        emailAlert.classList = "warning";
        emailAlert.textContent = "Введите настоящий email";
        email.after(emailAlert);
    }
    
  }
function isLoginValid(login){
    if (login.value.length < 4 || login.value.length > 16 || login.value == '' || login.value == null){
        loginAlert.classList = "warning";
        loginAlert.textContent = "Логин должен быть от 4 до 16 символов";
        login.after(loginAlert);
    }else{
        return true;
    }
}
function isPasswordValid(password, checkPassword){
    if (checkPassword.value != password.value || password.value == '' || password.value == null || password.value.length < 8){
        passwordAlert.classList = "warning";
        passwordAlert.textContent = "Пароль не должен быть менее 8 символов";
        password.after(passwordAlert);
    }else{
        return true;
    }
   
}
function isBirthDateValid(birthDate){
    if ((birthDay.value.length == 2 && birthDay.value != 0) && (birthYear.value.length == 4 && birthDay.value != 0)){
        return true;
    }else{
        birthAlert.classList = "warning";
        birthAlert.textContent = "Поля должны быть заполнены";
        birthDate.after(birthAlert);
    }
}
function changeStage() {
    let target = event.target;
    
        for(let i = 0; i < tab.length; i++){
            if(
                (inputsArr[i] == email  && isMailValid(email) == true) ||
                (inputsArr[i] == login && isLoginValid(login) == true) ||
                (inputsArr[i] == password && isPasswordValid(password, checkPassword) == true) ||
                (inputsArr[i+1] == birthDate && isBirthDateValid(birthDate) == true)
            ){
                if(target == buttons[i]){
                hideTabContent(0);
                showTabContent(i+1);
                setInactivePoint(0);
                setActivePoint(i+1);
                alertCleaner();
                let userInfo= {
                    email: email.value,
                    login: login.value,
                    password: password.value,
                    birthDate: `${birthYear.value}-${birthMonth.value}-${birthDay.value}`
                };
                json = JSON.stringify(userInfo);
                break;
                }

            }
        } 
}

    buttons[0].addEventListener("click", changeStage);
    buttons[1].addEventListener("click", changeStage);
    buttons[2].addEventListener("click", changeStage);
    buttons[3].addEventListener("click", () => {
        changeStage();
        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        request.send(json);
    });


    
