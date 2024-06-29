import { Games } from "./games.module.js";

new Games();

// !make btn in bottom when clink scroll to top navbar
const up = document.getElementById("up");
const moon = document.getElementById("moon");
const sun = document.getElementById("sun");

window.addEventListener("scroll", () => {
  document.documentElement.scrollTop > 800
    ? up.classList.remove("hidden")
    : up.classList.add("hidden");
});
// !Scroll to top when button is clicked
up.addEventListener("click", () => {
  document.documentElement.scrollTop = 0;
});
// !change  theme
moon.addEventListener("click", () => {
  moon.classList.add("d-none");
  sun.classList.remove("d-none");
  document.body.classList.add("theme-light");
});
sun.addEventListener("click", () => {
  sun.classList.add("d-none");
  moon.classList.remove("d-none");
  document.body.classList.remove("theme-light");
});
// !go to login || go to  register
document.querySelector(".goRegister").addEventListener("click", () => {
  document.querySelector(".register").classList.remove("d-none");
  document.querySelector(".login").classList.add("d-none");
});
document.querySelector(".goLogin").addEventListener("click", () => {
  document.querySelector(".login").classList.remove("d-none");
  document.querySelector(".register").classList.add("d-none");
});

// !start register js
const form = document.getElementById("register");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const emailRegister = document.getElementById("emailRegister");
const passwordRegister = document.getElementById("passwordRegister");
const age = document.getElementById("age");
const msg = document.getElementById("msg");
let arr = [];
if (localStorage.getItem("userData")) {
  arr = JSON.parse(localStorage.getItem("userData"));
}
form.addEventListener("submit", function (event) {
  event.preventDefault();
  let isValid = true;
  clearMessages();

  if (
    firstName.value.trim() === "" ||
    firstName.value.length < 2 ||
    firstName.value.length > 20
  ) {
    displayError(
      firstName,
      "First Name is required and must be between 2 and 20 characters."
    );
    isValid = false;
  }

  if (
    lastName.value.trim() === "" ||
    lastName.value.length < 2 ||
    lastName.value.length > 20
  ) {
    displayError(
      lastName,
      "Last Name is required and must be between 2 and 20 characters."
    );
    isValid = false;
  }

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (
    emailRegister.value.trim() === "" ||
    !emailPattern.test(emailRegister.value)
  ) {
    displayError(
      emailRegister,
      "Email is required and must be a valid format."
    );
    isValid = false;
  }
  const user = arr.find((user) => user.email === emailRegister.value);

  if (user) {
    displayError(emailRegister, "The Email already exists");
    isValid = false;
  }
  const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (
    passwordRegister.value.trim() === "" ||
    !passwordPattern.test(passwordRegister.value)
  ) {
    displayError(
      passwordRegister,
      "Password is required and must be at least 8 characters, including one letter and one number."
    );
    isValid = false;
  }

  if (
    age.value.trim() === "" ||
    isNaN(age.value) ||
    age.value < 10 ||
    age.value > 80
  ) {
    displayError(age, "Age is required and must be between 10 and 80.");
    isValid = false;
  }

  if (isValid) {
    const userData = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: emailRegister.value,
      password: passwordRegister.value,
      age: age.value,
    };
    arr.push(userData);
    localStorage.setItem("userData", JSON.stringify(arr));
    clearInputs();
    msg.innerHTML = "Form submitted successfully!";
    msg.classList.remove("text-danger");
    msg.classList.add("text-success");
  } else {
    msg.textContent = "Please correct the errors in the form.";
    msg.classList.remove("text-success");
    msg.classList.add("text-danger");
  }
});

function displayError(element, message) {
  const parent = element.parentElement;
  const feedback = parent.querySelector(".invalid-feedback");
  feedback.innerHTML = `<li>${message}</li>`;
  feedback.style.display = "block";
}

function clearMessages() {
  const errorMessages = form.querySelectorAll(".invalid-feedback");
  errorMessages.forEach(function (error) {
    error.style.display = "none";
    error.innerHTML = "";
  });
  msg.textContent = "";
}
function clearInputs() {
  firstName.value = "";
  lastName.value = "";
  emailRegister.value = "";
  passwordRegister.value = "";
  age.value = "";
}
// !end register js
// !start login
const loginForm = document.getElementById("login");
const emailLogin = document.getElementById("email");
const passwordLogin = document.getElementById("password");
const msgLogin = document.getElementById("msg-login");
const gameContainer = document.querySelector(".games");
loginForm.addEventListener("submit", function (event) {
  event.preventDefault();
  clearMessages();
  // Check if email and password match any user in the arr
  const user = arr.find(
    (user) =>
      user.email === emailLogin.value && user.password === passwordLogin.value
  );

  if (user) {
    msgLogin.textContent = "Login successful!";
    msgLogin.classList.remove("text-danger");
    msgLogin.classList.add("text-success");

    // Remove 'd-none' class from game container
    gameContainer.classList.remove("d-none");
    document.querySelector(".login").classList.add("d-none");
    document.querySelector(
      "#nameUser"
    ).innerHTML = `Welcome, ${user.firstName} ${user.lastName}`;
  } else {
    msgLogin.textContent = "Invalid email or password.";
    msgLogin.classList.remove("text-success");
    msgLogin.classList.add("text-danger");
  }
});
// !end login

document.querySelector("#logout").addEventListener("click", () => {
  gameContainer.classList.add("d-none");
  document.querySelector(".login").classList.remove("d-none");
});
