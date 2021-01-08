// Array for menu

let food = {
    pizzas: [{
            type: "Pizza Salami",
            price: 6.5,
            amount: 1,
        },
        {
            type: "Pizza Margharita",
            price: 5.8,
            amount: 1,
        },
        {
            type: "Pizza Diavolo",
            price: 8.5,
            amount: 1,
        },
        {
            type: "Pizza Funghi",
            price: 7.5,
            amount: 1,
        },
        {
            type: "Pizza Spaghetti",
            price: 6.5,
            amount: 1,
        },
    ],
    pastas: [{
            type: "Spaghetti Carbonara",
            price: 8.5,
            amount: 1,
        },
        {
            type: "Penne al Forno",
            price: 8.5,
            amount: 1,
        },
        {
            type: "Pasta al Salmone",
            price: 13.5,
            amount: 1,
        },
        {
            type: "Lasagne al Forno",
            price: 10.5,
            amount: 1,
        },
    ],
    salads: [{
            type: "Insalata Mista",
            price: 7.85,
            amount: 1,
        },
        {
            type: "Insalata di Pollo",
            price: 10.75,
            amount: 1,
        },
        {
            type: "Insalata di Contorno",
            price: 5.85,
            amount: 1,
        },
    ],
    images: [{
            src: "img/pexels-edward-eyer-1049620.jpg",
            name: "Pizza",
        },
        {
            src: "img/pexels-engin-akyurt-1460872.jpg",
            name: "Pasta",
        },
        {
            src: "img/pexels-chan-walrus-1059905.jpg",
            name: "Salat",
        },
    ],
};

let shoppingBasket = [];
let basketAmountWithoutShipping = 0;
let total = 0;
let orderStatus = 0;

window.onscroll = function() {
    let ibasket = document.getElementById("ibasket");

    if (window.scrollY > 72) {
        ibasket.style.top = "0";
    } else {
        ibasket.style.top = "72px";
    }
};

function loadHTML() {
    document.getElementById("food-insert").innerHTML = "";
    loadPizza();
    loadPasta();
    loadSalad();
    checksum();
}

function loadPizza() {
    let pizza = food["pizzas"];
    let div = document.getElementById("food-insert");
    div.innerHTML += generateCardTitle(
        "img/pexels-kenneth-carpina-1653772.jpg",
        "Pizza"
    );
    for (let i = 0; i < pizza.length; i++) {
        const element = pizza[i];
        div.innerHTML += generatePriceHTML(
            element["type"],
            element["price"].toFixed(2),
            element["amount"],
            i,
            "pizzas"
        );
    }
}

function loadPasta() {
    let pasta = food["pastas"];
    let div = document.getElementById("food-insert");
    div.innerHTML += generateCardTitle(
        "img/pexels-engin-akyurt-1460872.jpg",
        "Pasta"
    );
    for (let i = 0; i < pasta.length; i++) {
        const element = pasta[i];
        div.innerHTML += generatePriceHTML(
            element["type"],
            element["price"].toFixed(2),
            element["amount"],
            i,
            "pastas"
        );
    }
}

function loadSalad() {
    let salad = food["salads"];
    let div = document.getElementById("food-insert");
    div.innerHTML += generateCardTitle(
        "img/pexels-chan-walrus-1059905.jpg",
        "Salat"
    );
    for (let i = 0; i < salad.length; i++) {
        const element = salad[i];
        div.innerHTML += generatePriceHTML(
            element["type"],
            element["price"].toFixed(2),
            element["amount"],
            i,
            "salads"
        );
    }
}

function generateCardTitle(img, name) {
    return `<div class="menucard-mealsgroup">
                <img class="category-image" src="${img}">                
                <div class="item-name">
                    <h2>${name}</h2>
                </div>
            </div>`;
}

function generatePriceHTML(type, price, amount, i, category) {
    return `<div class="meal-container meal-container-discription">
                <span class="meal-name">${type}</span>
                <div class="meal-price">${price} €</div>
                <div class="number"><a onclick="reduceAmount('${category}',${i})">-</a> ${amount} <a onclick="increaseAmount('${category}',${i})">+</a>
                <button class ="btn btn-primary btn-lg" onclick="addToBasket('${category}', ${i})">Hinzufügen</button>  </div>
            </div>`;
}

function increaseAmount(category, i) {
    if (food[category][i]["amount"] <= 1) {
        food[category][i]["amount"]++;
    } else {
        food[category][i]["amount"]++;
    }

    loadHTML();
}

function reduceAmount(category, i) {
    food[category][i]["amount"]--;
    if (food[category][i]["amount"] <= 1) {
        food[category][i]["amount"] = 1;
    }

    loadHTML();
}

// add food to bakset
function addToBasket(category, i) {
    const clone = JSON.parse(JSON.stringify(food[category][i]));
    food[category][i]["amount"] = 1;
    loadHTML();
    showBasket(clone);
}

function showBasket(clone) {
    let item = {
        name: clone.type,
        price: clone.price,
        amount: clone.amount,
    };


    let itemInBasket = shoppingBasket.find(e => e.name == item.name);

    console.log('item', item);
    console.log('itemInBasket', itemInBasket);

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
        )
    }

    showBasketPlaceholder();
    totalPriceCalc();
    loadHTML();
}




function generateCard(amount, type, finalprice, i) {
    return ` 
    <div class="card-row">
        <div class="card-column">
            <div id="amounts${i}"> ${amount} x </div>
            <div>${type}</div> 
        </div>
        <div class="card-column">
                <div>  <img onclick="increase(${i})" class="icon3" src="img/plus_50px.png"></div>
                <div>  <img onclick="decrease(${i})" class="icon3" src="img/minus_50px.png"> </div>
            </div>

            <div class="card-column">
                <div class="item-price">${finalprice.toFixed(2)} € </div>
                <img onclick="deleteItem(${i})" class="icon3" src="img/trash_64px.png">
            </div>
        </div>
    </div>`;
}

function deleteItem(i) {
    shoppingBasket.splice(i, 1);
    updatedBasket();
    if (shoppingCart.length == 0) {
        document.getElementById("shoppingcart").classList.remove("d-none");
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
    let sum = basketAmountWithoutShipping;
    if (sum > 20) {
        orderStatus = 1;
    } else {
        orderStatus = 0;
        document.getElementById(
            "sumcheck"
        ).innerHTML = ` <br /> Du hast den Mindestbestellwert von 20€ noch nicht erreicht. `;
    }
}

function startorder() {
    if (orderStatus == 1) {
        alert("....doch nicht. :-)");
        shoppingBasket = [];
        document.getElementById("shoppingcard").innerHTML = "";
        totalPriceCalc();
        checksum();
        showBasketPlaceholder();
    } else {
        alert("Mindestbestellwert noch nicht erreicht");
    }
}


function showBasketPlaceholder() {

    if (shoppingBasket.length == 0) {
        document.getElementById("shoppingcard").innerHTML =
            `  <img src="https://img.icons8.com/carbon-copy/100/000000/shopping-cart.png">
        <p> Wähle leckere Gerichte aus und bestelle Dein Menü. </p>`;
    }

}