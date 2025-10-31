console.log('Hello, world!!!');

let navbar1 = document.querySelector("#nav1")
let stickyNav = document.querySelector("#sticky-nav")
function time(){
    setTimeout(()=>{
        navbar1.classList.remove("nav-start-disappear")
    },150)
}

function stickyNavToggle(){
    if(window.scrollY >= 100){
        if(stickyNav.classList.contains("sticky-nav-disappear")){
            stickyNav.classList.remove("sticky-nav-disappear")
        }
    }else{
        stickyNav.classList.add("sticky-nav-disappear")
    }
}

document.addEventListener("scroll", stickyNavToggle)
document.addEventListener("DOMContentLoaded", time)

