src="https://code.jquery.com/jquery-3.4.1.min.js">
 $('.addCalc').click(function(e) {
    var num = e.target.dataset.id;
    var price = menu[num].가격;
    console.log(num);
    
  })