let shoppingBasket = [];
setURL(
    "http://alexander-kummerer.developerakademie.com/lieferando/json_to_server"
);
let basketAmountWithoutShipping = 0;
let total = 0;
let orderStatus = 0;
let itemsAmount = 0;
let minimumOrderCosts = 40;
let minimumdifference;
let orderedMeals = [];

function init() {
    downloadFromServer();
    shoppingBasket = JSON.parse(localStorage.getItem("shoppingBasket")) || [];
    updatedBasket();
    loadHTML();
}

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
        updatedBasket();
    } else {
        shoppingBasket.push(item);
        updatedBasket();
    }
}

function updatedBasket() {
    document.getElementById("basket-btn").innerHTML = "";
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
    localStorage.setItem("shoppingBasket", JSON.stringify(shoppingBasket));
    totalPriceCalc();
    countArrayAmount();
    loadHTML();
    showBasketBtn();
    minimumOrderDif();
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
    loadHTML();
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
    if (basketAmountWithoutShipping > 40) {
        orderStatus = 0;
        document.getElementById(
            "sumcheck"
        ).innerHTML = `<br> <div> Du hast den Mindestbestelllwert erreicht. Du kannst nun bestellen.</div> `;
    } else {
        orderStatus = 1;
        document.getElementById(
            "sumcheck"
        ).innerHTML = `<br> <div> Leider kannst du noch nicht bestellen. Wir liefern erst ab einen Mindestbestellwert von <span>${minimumOrderCosts.toFixed(
      2
    )} € </span> (exkl. Lieferkosten). `;
    }
}

function startorder() {
    if (orderStatus == 0) {
        const clone = JSON.parse(JSON.stringify(shoppingBasket));
        orderedMeal(clone);
        alert("....doch nicht. :-)");
        shoppingBasket = [];
        localStorage.setItem("shoppingBasket", JSON.stringify(shoppingBasket));
        document.getElementById("shoppingcard").innerHTML = "";
        document.getElementById("basket-btn").innerHTML = "";
        resolve();
    } else {
        alert("Mindestbestellwert von 40,00 € noch nicht erreicht");
    }
}

function resolve() {
    totalPriceCalc();
    checksum();
    showBasketPlaceholder();
    closeBasket();
    minimumOrderDif();
}

function showBasketPlaceholder() {
    if (shoppingBasket.length == 0) {
        document.getElementById(
            "shoppingcard"
        ).innerHTML = `  <img src="https://img.icons8.com/carbon-copy/100/000000/shopping-cart.png">
        <p> Wähle leckere Gerichte aus und bestelle Dein Menü. </p>`;
    }
}

function minimumOrderDif() {
    document.getElementById("minimumcost").innerHTML = "";
    minimumdifference = minimumOrderCosts - basketAmountWithoutShipping;
    if (shoppingBasket.length >= 1) {
        document
            .getElementById("minimumcost")
            .classList.add("sum-row", "minimumcost");
        document.getElementById("minimumcost").innerHTML = `
        <p> Benötigter Betrag, um den Mindestbestellwert zu erreichen </p>
        <span>${minimumdifference.toFixed(2)} € </span>
        `;
    }
    if (minimumdifference <= 0) {
        document
            .getElementById("minimumcost")
            .classList.remove("sum-row", "minimumcost");
        document.getElementById("minimumcost").innerHTML = "";
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
            <span class="basket-button-counter">${itemsAmount}</span>
          </div>
          <p class="basket-button-label">
            <span class=""> Warenkorb</span>
            <span class="basket-button-label-price"> (${basketAmountWithoutShipping.toFixed(
              2
            )} €) </span>
          </p>
        </button>
    </div>

`;
}

function countArrayAmount() {
    itemsAmount = shoppingBasket.length;
}

function showBasketMobile() {
    document.getElementById("ibasket").classList.remove("hide-mobile");
}

function closeBasket() {
    document.getElementById("ibasket").classList.add("hide-mobile");
}

function orderedMeal(clone) {
    meal = {
        id: new Date().getTime(),
        meals: clone,
    };

    orderedMeals.push(meal);
    backend.setItem("orderedMeals", JSON.stringify(orderedMeals));
}