const ham = doucment.getElementById("ham");
const closeM = document.getElementById("close");
const menu = document.getElementById("menu");

ham.addEventListiner("click", () =>{
    menu.classList.toggle("hidden");
})
closeM.addEventListiner("click", () =>{
    menu.classList.toggle("hidden");
})