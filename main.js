let navbar1 = document.querySelector("#nav1")
let stickyNav = document.querySelector("#sticky-nav")
let catalog = document.querySelector("#sidebar > h3")
let prevScrollPos = window.pageYOffset

function time(){
    setTimeout(()=>{
        navbar1.classList.remove("nav-start-disappear")
    },5)
}

console.log(catalog)

function stickyNavbarShow(){
    const currentScrollPos = window.pageYOffset;
    if(prevScrollPos > currentScrollPos){
        stickyNav.classList.remove("sticky-nav-disappear")
    }else{
        stickyNav.classList.add("sticky-nav-disappear")
    }
    prevScrollPos = currentScrollPos
    if(window.pageYOffset <= 40){
        stickyNav.classList.add("sticky-nav-disappear")
    }
}
document.addEventListener("scroll", stickyNavbarShow)
// document.addEventListener("DOMContentLoaded", time)

console.log(window.pageYOffset)