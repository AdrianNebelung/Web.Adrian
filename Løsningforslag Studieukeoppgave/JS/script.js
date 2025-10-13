const ham = document.getElementById("ham");
const closeM = document.getElementById("close");
const menu = document.getElementById("menu");

ham.addEventListener("click", () => {
    menu.classList.toggle("hidden");
});
closeM.addEventListener("click", () =>{
    menu.classList.toggle("hidden");
});
