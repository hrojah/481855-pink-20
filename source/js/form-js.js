var form = document.querySelector(".competition__form")
var surname = document.querySelector(".surname")
var firstName = document.querySelector(".first-name")
var email = document.querySelector(".email")
var success = document.querySelector(".pop-up--success")
var failure = document.querySelector(".pop-up--failure")
var ok = document.querySelector(".pop-up__button--ok")
var close = document.querySelector(".pop-up__button--close")


surname.removeAttribute("required");
firstName.removeAttribute("required");
email.removeAttribute("required");


form.addEventListener("submit", function (evt) {

  evt.preventDefault();
  if (!surname.value || !firstName.value || !email.value) {
    failure.classList.add("pop-up--show");
  } else {
    success.classList.add("pop-up--show");
  }
})

ok.addEventListener("click", function (evt) {
  failure.classList.remove("pop-up--show");
})

close.addEventListener("click", function (evt) {
  success.classList.remove("pop-up--show");
})

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (failure.classList.contains("pop-up--show") || success.classList.contains("pop-up--show")) {
      evt.preventDefault();
      failure.classList.remove("pop-up--show");
      success.classList.remove("pop-up--show");
    }
  }
});
