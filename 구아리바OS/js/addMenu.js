
function addMenu() {
    var menuName = document.querySelector('#menuName').value;
    var menuInfo = document.querySelector('#menuInfo').value;
    var price = document.querySelector('#price').value;
    localStorage.setItem('menuName', menuName);
    localStorage.setItem('menuInfo', menuInfo);
    localStorage.setItem('price', price);
    location.href="bossPage.html";
}

/*
function addMenu() {
    var menuName = document.querySelector('#menuName').value;
    var menuInfo = document.querySelector('#menuInfo').value;
    var price = document.querySelector('#price').value;
    localStorage.setItem('menuName', menuName);
    localStorage.setItem('menuInfo', menuInfo);
    localStorage.setItem('price', price);
    location.href="bossPage.html";

}
*/
