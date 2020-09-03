var openMenu = document.querySelector(".nav__toggle")
var header = document.querySelector(".page-header")
var headerWrapper = document.querySelector(".page-header__wrapper")
var siteList = document.querySelector(".site-list")
var main = document.querySelector(".main")


header.classList.add("page-header--menu");
headerWrapper.classList.add("page-header__wrapper--menu");
siteList.classList.add("site-list--menu");
main.classList.add("main--menu");


openMenu.addEventListener("click", function (evt) {

  header.classList.toggle("page-header--menu");
  headerWrapper.classList.toggle("page-header__wrapper--menu");
  siteList.classList.toggle("site-list--menu");
  main.classList.toggle("main--menu");
  openMenu.classList.toggle("nav__toggle--close");
})
