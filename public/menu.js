if (localStorage.length == 0) {
  console.log('비어있음');
  var itemList = [];
  var priceList = [];
  localStorage.setItem("menuName", JSON.stringify(itemList));
  localStorage.setItem('price', JSON.stringify(priceList));
  var output = localStorage.getItem('menuName');
  var output2 = localStorage.getItem('price');
  var arr = JSON.parse(output);
  var arr2 = JSON.parse(output2);

  $('.addCalc').click(function (e) {
    var menuName = e.target.dataset.name;
    var menuPrice = e.target.dataset.price;
    arr.push(menuName);
    arr2.push(menuPrice);
    put();
    showList();
  })
} else {
  console.log("배열 있음");

  var output = localStorage.getItem('menuName');
  var output2 = localStorage.getItem('price');
  var arr = JSON.parse(output);
  var arr2 = JSON.parse(output2);
  showList();
  $('.addCalc').click(function (e) {
    var menuName = e.target.dataset.name;
    var menuPrice = e.target.dataset.price;
    arr.push(menuName);
    arr2.push(menuPrice);
    put();
    showList();
  })

}

function showList() {
  var list = "<ul>";
  for (var i = 0; i < arr.length; i++) {
    list += "<li>" + arr[i] + "<span class='close' id=" + i + ">X</span><li>";
  }
  list += "<ul>";
  var money = 0;
  for (var i = 0; i < arr2.length; i++) {
    money += parseInt(arr2[i]);
  }
  document.querySelector(".list").innerHTML = list;
  document.querySelector('.price').innerHTML = "<span> 결제 금액 : </span>" + "<span class = 'money'>"+money+" 원 </span>";
  var remove = document.querySelectorAll(".close");
  for (var i = 0; i < remove.length; i++) {
    remove[i].addEventListener("click", removeList);
  }
}

function removeList() {
  var id = this.getAttribute("id");

  arr.splice(id, 1);
  arr2.splice(id, 1);
  put();
  showList();
}

function put() {
  localStorage.setItem("menuName", JSON.stringify(arr));
  localStorage.setItem("price", JSON.stringify(arr2));
  var output = localStorage.getItem('menuName');
  var output2 = localStorage.getItem('price');
  arr = JSON.parse(output);
  arr2 = JSON.parse(output2);
}
