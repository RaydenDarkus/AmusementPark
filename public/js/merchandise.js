// Updates Page every 60 sec
// setInterval(function(){location.reload(true);}, 60000);

// Increase and decrease
$(function() {
  $('[data-decrease]').click(decrease);
  $('[data-increase]').click(increase);
  $('[data-value]').change(valueChange);
});

function decrease() {
  var value = $(this).parent().find('[data-value]').val();
  if(value > 0) {
    value--;
    $(this).parent().find('[data-value]').val(value);
  }
  if(value == 0){
    $(this).closest('.cart-box').remove(); // remove the cart box element
  }
  updateTotal();
}

function increase() {
    var value = $(this).parent().find('[data-value]').val();
    value++;
    $(this).parent().find('[data-value]').val(value);
    updateTotal();   
}

function valueChange() {
  var value = $(this).val();
  if(value == undefined || isNaN(value) == true || value <= 1) {
      $(this).val(1);
  }
  if(value == 0) {
    $(this).closest('.cart-box').remove(); // remove the cart box element
  }
  updateTotal();
}

//Cart Buttons
const carticon = document.getElementById("cart-icon");
const cart = document.getElementById("cart");
const mainpage = document.getElementById("main");
const cartclose = document.getElementById("close-cart");

// Add the cart
carticon.addEventListener("click", function() {
    cart.classList.add('cart-active');
    mainpage.classList.add('main-retract');
});

//Remove the cart
cartclose.addEventListener("click", function() {
    cart.classList.remove('cart-active');
    mainpage.classList.remove('main-retract');
});

//Working of the cart
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded",ready);
}
else {
    ready();
}

function ready() {
    var removeCartButtons = document.getElementsByClassName("cart-remove");
    for (var i=0;i<removeCartButtons.length;i++) {
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }
    var addCart = document.getElementsByClassName("add-cart");
    for (var i=0; i<addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click",addCartClicked);
    }
    var buyNow = document.getElementById("buy-now");
    buyNow.addEventListener("click", function() {
        alert("Your order is placed");
        window.location.href = "/credit_card_form";
    });
    updateTotal();  
}

// Remove the Cart
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

//Add to the cart 
function addCartClicked(event) {
    cart.classList.add('cart-active');
    mainpage.classList.add('main-retract');
    var button = event.target;
    var shopProducts = (button.parentElement).parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var prodImg = shopProducts.getElementsByClassName("prod-img")[0].src;
    addProductToCart(title, price, prodImg);
    updateTotal();
}


function addProductToCart(title, price, prodImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for(var i=0; i<cartItemsNames.length;i++) {
        if(cartItemsNames[i].innerText == title){
            alert("You have already added this item to the cart");
            return;
        }
    }
    var cartBoxContent = 
    `<img src="${prodImg}" alt="" class="cart-img">
    <div class="detail-box">
    <div class="cart-product-title">${title}</div>
    <div class="cart-price">${price}</div>
    <div class="number-input">
        <button data-decrease>-</button>
        <input data-value class="cart-quantity" placeholder="Quantity" type="number" value="1" />
        <button data-increase>+</button>
    </div>
    </div>
    <i class="bx bxs-trash-alt cart-remove"></i>`;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);

    // Bind the decrease() function to the decrease button
    cartShopBox.querySelector('[data-decrease]').addEventListener('click', decrease);
    
    // Bind the increase() function to the increase button
    cartShopBox.querySelector('[data-increase]').addEventListener('click', increase);

    cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click",removeCartItem);
    cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change",valueChange);
}


//Update the total amount
function updateTotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for(var i=0;i<cartBoxes.length;i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("$",""));
        var quantity = quantityElement.value;
        total += price * quantity;
    }
    total = Math.round(total * 100)/100;
    var buyNow = document.getElementById("buy-now");
    document.getElementsByClassName("total-price")[0].innerText = "$" + total.toFixed(2);
    if(total == 0) {
        cart.classList.remove('cart-active');
        mainpage.classList.remove('main-retract');
        total = 0;
        buyNow.classList.add("disabled");
        buyNow.removeAttribute("href");
        buyNow.addEventListener("click", function (event) {
          event.preventDefault();
        });
    }
    else {
        buyNow.classList.remove("disabled");
        buyNow.href = "credit_card_form.html";
        buyNow.removeEventListener("click", function (event) {
          event.preventDefault();
        });
    }
}
