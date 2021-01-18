let shoppingBasket = [];
let basketAmountWithoutShipping = 0;
let total = 0;
let orderStatus = 0;

function showBasket(clone) {
    let item = {
        name: clone.type,
        price: clone.price,
        amount: clone.amount,
    };

    let itemInBasket = shoppingBasket.find((e) => e.name == item.name);

    console.log("item", item);
    console.log("itemInBasket", itemInBasket);

    if (itemInBasket) {
        itemInBasket.amount += item.amount; // =   itemInBasket.amount = itemInBasket.amount + item.amount;
    } else {
        shoppingBasket.push(item);
    }
    updatedBasket();
}

function updatedBasket() {
    document.getElementById("shoppingcard").innerHTML = "";
    for (let i = 0; i < shoppingBasket.length; i++) {
        const card = shoppingBasket[i];
        let finalprice = card["price"] * card["amount"];
        document.getElementById("shoppingcard").innerHTML += generateCard(
            card["amount"],
            card["name"],
            finalprice,
            i
        );
    }
    totalPriceCalc();
    loadHTML();
    showBasketBtn();
}

function generateCard(amount, type, finalprice, i) {
    return ` 
    <div class="card-row">
        <div class="card-column">
            <div class="cart-meal-amount" id="amounts${i}"> ${amount}x </div>
            <div class="cart-meal-name"> ${type}</div> 
        </div>
        <div class="card-column card-meal-edit">
                <div>  <img onclick="decrease(${i})" class="icon3" src="img/minus_50px.png"></div>
                <div>  <img onclick="increase(${i})" class="icon3" src="img/plus_50px.png"> </div>
            </div>

            <div class="card-column">
                <div class="item-price">${finalprice.toFixed(2)} € </div>
                <img class="cart-meal-delete" onclick="deleteItem(${i})" class="icon3" src="img/trash_64px.png">
            </div>
        </div>
    </div>`;
}

function deleteItem(i) {
    shoppingBasket.splice(i, 1);
    updatedBasket();
    if (shoppingCart.length == 0) {
        document
            .getElementById("shoppingcard_Placeholder")
            .classList.remove("d-none");
    }
}

function increase(i) {
    shoppingBasket[i].amount++;
    updatedBasket();
}

function decrease(i) {
    shoppingBasket[i].amount--;
    if (shoppingBasket[i].amount == 0) {
        deleteItem(i);
    }
    updatedBasket();
}

function totalPriceCalc() {
    basketAmountWithoutShipping = 0;
    let total = 0;
    for (let i = 0; i < shoppingBasket.length; i++) {
        const card = shoppingBasket[i];
        basketAmountWithoutShipping += card["price"] * card["amount"];
        total = basketAmountWithoutShipping + 4.55;
    }

    document.getElementById(
        "sumwithoutshipping"
    ).innerHTML = `${basketAmountWithoutShipping.toFixed(2)} € `;
    document.getElementById("sumwithshipping").innerHTML = `${total.toFixed(
    2
  )} €`;
}

function checksum() {
    if (basketAmountWithoutShipping > 20) {
        orderStatus = 0;
        document.getElementById("sumcheck").innerHTML = "";
    } else {
        orderStatus = 1;
        document.getElementById(
            "sumcheck"
        ).innerHTML = ` <br /> Du hast den Mindestbestellwert von 20€ noch nicht erreicht. `;
    }
}

function startorder() {
    if (orderStatus == 0) {
        alert("....doch nicht. :-)");
        shoppingBasket = [];
        document.getElementById("shoppingcard").innerHTML = "";
        totalPriceCalc();
        checksum();
        showBasketPlaceholder();
    } else {
        alert("Mindestbestellwert von 20,00 €noch nicht erreicht");
    }
}

function showBasketPlaceholder() {
    if (shoppingBasket.length == 0) {
        document.getElementById(
            "shoppingcard"
        ).innerHTML = `  <img src="https://img.icons8.com/carbon-copy/100/000000/shopping-cart.png">
        <p> Wähle leckere Gerichte aus und bestelle Dein Menü. </p>`;
    }
}


function showBasketBtn() {
    if (shoppingBasket.length >= 1) {
        document.getElementById("basket-btn").classList.remove("d-none");
        document.getElementById("basket-btn").innerHTML += generateBtn();
    }
}

function generateBtn() {
    return `
    <div class="basket-bottom-bar">
        <button class="basket-bottom-button btn-primary btn-lg" onclick="showBasketMobile()">
          <div class="basket-button-icon-container">
            <img class="basket-button-icon"src="img/shopping_cart_26px.png"/>
            <span class="basket-button-counter">1</span>
          </div>
          <p class="basket-button-label">
            <span class=""> Warenkorb</span>
            <span class="basket-button-label-price"> (${basketAmountWithoutShipping.toFixed(2)} €) </span>
          </p>
        </button>
    </div>

`;
}

function showBasketMobile() {
    document.getElementById("ibasket").classList.remove("hide-mobile");
}

function closeBasket() {
    document.getElementById("ibasket").classList.add("hide-mobile");
}