let shoppingBasket = [];
setURL(
    "http://alexander-kummerer.developerakademie.com/lieferando/json_to_server"
);
let subtotal = 0;
let total = 0;
let orderStatus = 0;
let itemsAmount = 0;
let minimumOrderCosts = 20;
let minimumdifference;
let orderedMeals = [];

/**
 * This funtion will load the saved basket from the local Storage
 *
 *
 */
async function init() {
    await downloadFromServer();
    shoppingBasket = JSON.parse(localStorage.getItem("shoppingBasket")) || [];
    updatedBasket();
}

/**
 * This function check, if each meal is in the basket.
 *
 * @param {object} clone
 */
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

/**
 * This function will update the basket.
 *
 */
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
    checksum();
}

/**
 *
 * this function will show the meal with amount in the basket
 *
 * @param {number} amount - amount of each meal
 * @param {string} type - type of the meal
 * @param {number} finalprice - finalprice of each meal
 * @param {number} i - number of each type
 */
function generateCard(amount, type, finalprice, i) {
    return ` 
    <div class="card-row">
        <div class="card-column amount">
            <div class="cart-meal-amount" id="amounts${i}"> ${amount}x </div>
            <div class="cart-meal-name"> ${type}</div> 
        </div>
        <div class="card-column card-meal-edit">
                <div>  <img onclick="decrease(${i})" class="icon3" src="img/minus_50px.png"></div>
                <div>  <img onclick="increase(${i})" class="icon3" src="img/plus_50px.png"> </div>
            </div>

            <div class="card-column">
                <div class="item-price">${finalprice.toFixed(2)} € </div>
                <img class="cart-meal-delete" onclick="deleteMeal(${i})" class="icon3" src="img/trash_64px.png">
            </div>
        </div>
    </div>`;
}

/**
 *
 * You can delete the meal
 *
 * @param {number} i - number of each type
 */
function deleteMeal(i) {
    shoppingBasket.splice(i, 1);
    updatedBasket();
    loadHTML(food);
}

/**
 * You can increase the amount
 *
 * @param {number} i - number of each type
 */
function increase(i) {
    shoppingBasket[i].amount++;
    updatedBasket();
}

/**
 *
 * You can decrease the amount
 *
 *  @param {number} i - number of each type
 */
function decrease(i) {
    shoppingBasket[i].amount--;
    if (shoppingBasket[i].amount == 0) {
        deleteMeal(i);
    }
    updatedBasket();
}

/**
 * This function calculates the finalprce and the subtotal
 *
 */
function totalPriceCalc() {
    subtotal = 0;
    let total = 0;
    for (let i = 0; i < shoppingBasket.length; i++) {
        const card = shoppingBasket[i];
        subtotal += card["price"] * card["amount"];
        total = subtotal + 4.55;
    }
    document.getElementById("sumwithoutshipping").innerHTML = `${subtotal.toFixed(
    2
  )} € `;
    document.getElementById("sumwithshipping").innerHTML = `${total.toFixed(
    2
  )} €`;
}

/**
 *
 * This funciton will check if the subtotal is higher than the minimumOrderCosts
 *
 *
 */
function checksum() {
    if (subtotal < minimumOrderCosts) {
        orderStatus = 1;
        document.getElementById(
            "sumcheck"
        ).innerHTML = `<br> <div> Leider kannst du noch nicht bestellen. Wir liefern erst ab einen Mindestbestellwert von <span>${minimumOrderCosts.toFixed(
      2
    )} € </span> (exkl. Lieferkosten). `;

    } else {
        orderStatus = 0;
        document.getElementById(
            "sumcheck"
        ).innerHTML = `<br> <div> Du hast den Mindestbestelllwert erreicht. Du kannst nun bestellen.</div> `;


    }
}

/**
 * This function declares the the basket placeholder if shoppingBasket array =0
 *
 *
 */
function showBasketPlaceholder() {
    if (shoppingBasket.length == 0) {
        document.getElementById(
            "shoppingcard"
        ).innerHTML = `  <img src="https://img.icons8.com/carbon-copy/100/000000/shopping-cart.png">
        <p> Wähle leckere Gerichte aus und bestelle Dein Menü. </p>`;
    }
}

/**
 * This function will display the difference of minimumOrderCosts and the subtotal.
 *
 *
 */
function minimumOrderDif() {
    document.getElementById("minimumcost").innerHTML = "";
    minimumdifference = minimumOrderCosts - subtotal;
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

/**
 *
 * This function will show the Basket Button on responsive displays
 *
 *
 */
function showBasketBtn() {
    if (shoppingBasket.length >= 1) {
        document.getElementById("basket-btn").classList.remove("d-none");
        document.getElementById("basket-btn").innerHTML += generateBtn();
    }
}

/**
 * This function generates the Button
 *
 */
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
            <span class="basket-button-label-price"> (${subtotal.toFixed(
              2
            )} €) </span>
          </p>
        </button>
    </div>

`;
}

/**
 *
 * This function will count the amount of each type of meal
 *
 */
function countArrayAmount() {
    itemsAmount = shoppingBasket.length;
}

function showBasketMobile() {
    document.getElementById("ibasket").classList.remove("hide-mobile");
}

function closeBasket() {
    document.getElementById("ibasket").classList.add("hide-mobile");
}

/**
 * This function will give you a alert if order is succes or subtotal is not reached
 *
 */
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
        alert("Mindestbestellwert von 20,00 € noch nicht erreicht");
    }
}

function resolve() {
    totalPriceCalc();
    checksum();
    showBasketPlaceholder();
    closeBasket();
    minimumOrderDif();
    orderStatus = 0;
}

/**
 *
 *This function will generate a new Array after the order was succesfull and save the order on the server
 *
 * @param {object} clone - clove of the shoppingBasket Array
 */
function orderedMeal(clone) {
    meal = {
        id: new Date().getTime(),
        meals: clone
    };

    orderedMeals.push(meal);
    backend.setItem("orderedMeals_" + new Date().getTime(), JSON.stringify(orderedMeals));
}