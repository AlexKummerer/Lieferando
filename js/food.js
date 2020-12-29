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

let basketAmountWithoutShipping = 0.0;
let basketAmountWithShipping = 0.0;
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
    document.getElementById("food-insert").innerHTML = '';
    loadPizza();
    loadPasta();
    loadSalad();
    basket();
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
            "salats"
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
    if (food[category][i]["amount"] >= 1) {
        food[category][i]["amount"]--;
    } else {

        food[category][i]["amount"] = 1;
    }

    loadHTML();
}

function basket() {
    document.getElementById(
        "sumwithoutshipping"
    ).innerHTML = `<p>Zwischensumme</p> <p> ${basketAmountWithoutShipping} € </p>`;
    document.getElementById(
        "sumwithshipping"
    ).innerHTML = `<p>Gesamtsumme</p> <p> ${basketAmountWithShipping} €</p>`;
    document.getElementById(
        "shoppingcart"
    ).innerHTML = `<div class="shoppingcart" id="shoppingcart">
    <img src="https://img.icons8.com/carbon-copy/100/000000/shopping-cart.png" />
    <p> Wähle leckere Gerichte aus und bestelle Dein Menü. </p></div>`;
    checksum();
}

function startorder() {
    checksum();
    if (orderStatus == 1) {
        alert("Dies ist ein Test. Warenkorb wird nun geleert");
        checksum();
    } else {
        alert("Mindestbestellwert noch nicht erreicht");
    }
}

function checksum() {
    let sum = basketAmountWithoutShipping;
    if (sum >= 20) {
        orderStatus = 1;
    }
    if (sum < 20) {
        orderStatus = 0;
        document.getElementById(
            "sumcheck"
        ).innerHTML = ` <br /> Du hast den Mindestbestellwert von 20€ noch nicht erreicht. `;
    }
}

// add food to bakset
function addToBasket(category, i) {
    shoppingBasket.push(food[category][i]);
    document.getElementById("shoppingcart").innerHTML += ``;
}