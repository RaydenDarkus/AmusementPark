
// window.onload = function() {
//   alert("Select weekend dates and get 10% special Discount!");
// };

//based on the customers selection the ticket type gets defaulted in the current page.
var tickettype = sessionStorage.getItem("buttonWW");
document.getElementById("ticket-typeid").value = tickettype;
var DB = {};
var avl = {};
//calculates the price of the current ticket
function calculatePrice() {
  var ticketType = document.getElementById("ticket-typeid").value;
  var quantity = document.getElementById("quantity").value;
  var price;
  if (ticketType == 'SnowWorld') {
    price = 20;
  } else if (ticketType == 'WaterWorld') {
    price = 30;
  } else if (ticketType == 'ThemePark') {
    price = 40;
  }
  let totalPrice = price * quantity;
  document.getElementById("total-price").value = totalPrice;
}
//onclicking paynow button the paymentgateway form is invoked
function goToPage() {
  var quantity = document.getElementById("quantity").value;
  var date = document.getElementById("booking-date").value;
  if (quantity < 1) {
    $('#qtyvalidation').modal('show');
    //alert("Please specify a valid quantity");
    return;
  }
  if (date == '') {
    $('#datevalidation').modal('show');
    //alert("Please choose the date");
    return;
  }
  goToLogin();
}

function applyDiscount() {
  let savetotal = document.getElementById("total-price").value;
  let set = false;
  for (const month in DB) {
    if (DB.hasOwnProperty(month)) {
      const weekends = DB[month].weekends;
      console.log(`Weekends in ${month}:`);
      for (const date in weekends) {
        let bdate = document.getElementById("booking-date").value;
        if (bdate == weekends[date]) {
          let price = document.getElementById("total-price").value;
          var qty = document.getElementById("quantity").value;
          let disc = (price * 10) / 100;
          let total = price - disc;
          if (qty != "") {
            document.getElementById("total-price").value = total;
            //alert("Weekends are applied with 10% discount");
            $('#discount').modal('show');
            set = true;
            break;
          }
        }
      }
      if (set = true) {
        break;
      }
    }
  }
}

//snowworld not available on mondays
//themepark not available on tuesdays
//waterworld not available on wednesdays
function availability() {
  for (const type in avl) {
    if (avl.hasOwnProperty(type)) {
      const Ticket = avl[type].avaialbility;
      let tt = document.getElementById("ticket-typeid").value;
      if (type == tt) {
        for (const date in Ticket) {
          let bdate = document.getElementById("booking-date").value;
          if (bdate == Ticket[date]) {
            $("#avail").modal('show');
            return;
          }
        }
      }
    }
  }
}

$(document).ready(function () {
  // on performing a date change from the weekend dates then the original price amount is restored
  $("#booking-date").change(function () {
    availability();
    calculatePrice();
    applyDiscount();
  }).change();
  $("#quantity").change(function () {
    availability();
    calculatePrice(); 
    applyDiscount();
  }).change();
  $("#paynow").click(function () {
    goToPayment();
  });
  // "C:\Users\sweth\OneDrive\Desktop\632project\nodejs\ProjectTest\JavaScript\Checkpoint-2\booking.json"
  $.getJSON("./json/Promo.json", function (data) {
    DB = data;
    console.log(data)
  });
  $.getJSON("./json/availability.json", function (avldata) {
    avl = avldata;
    console.log(avldata)
  });
});
