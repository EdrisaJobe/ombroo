const menu = document.querySelector(".menu");
const navItems = document.querySelector(".nav-items");

// Open the menu upon clicking the menu icon
menu.addEventListener("click", () => {
    menu.classList.toggle("active");
    navItems.classList.toggle("active");
})

// Hide the menu when an option is chosen
document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () =>{
    menu.classList.remove("active");
    navItems.classList.remove("active");
}))
