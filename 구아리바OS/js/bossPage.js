window.onload = function bossAddMenu() {
var newDiv = document.createElement("div");
var menuName = document.createTextNode(localStorage.getItem('menuName'));
var menuInfo = document.createTextNode(localStorage.getItem('menuInfo'));
var price = document.createTextNode(localStorage.getItem('price'));
newDiv.appendChild(menuName);
newDiv.appendChild(menuInfo);
newDiv.appendChild(price);
newDiv.setAttribute("class", "card");
var card = document.querySelector("#card");
var line = document.querySelector(".line");
line.insertBefore(newDiv, card);
}