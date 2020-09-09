var openMenu = document.querySelector(".page-header__toggle")
var header = document.querySelector(".page-header")
var headerWrapper = document.querySelector(".page-header__wrapper")
var siteList = document.querySelector(".site-list")
var main = document.querySelector(".main")
var openIcon = document.querySelector(".page-header__open")
var closeIcon = document.querySelector(".page-header__close")


header.classList.add("page-header--menu");
headerWrapper.classList.add("page-header__wrapper--menu");
siteList.classList.add("site-list--menu");
main.classList.add("main--menu");
openIcon.classList.remove("page-header__open--hidden");


openMenu.addEventListener("click", function (evt) {

  header.classList.toggle("page-header--menu");
  headerWrapper.classList.toggle("page-header__wrapper--menu");
  siteList.classList.toggle("site-list--menu");
  main.classList.toggle("main--menu");
  openIcon.classList.toggle("page-header__open--hidden");
  closeIcon.classList.toggle("page-header__close--active");
})
