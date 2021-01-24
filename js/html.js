let food = fetch(
        "http://alexander-kummerer.developerakademie.com/lieferando/js/food.json")
    .then(response => response.json())
    .then(response => {
        console.log(response);
        food = response;
    });



function loadHTML() {
    document.getElementById("food-insert").innerHTML = "";
    loadPizza();
    loadPasta();
    loadSalad();
    checksum();
    showBasketPlaceholder();
}

function loadPizza() {
    let pizza = food["pizzas"];
    let image = food["images"][0];
    let div = document.getElementById("food-insert");
    div.innerHTML += generateCardTitle(image["src"], image["name"]);

    for (let i = 0; i < pizza.length; i++) {
        const pizzas = pizza[i];
        let pricing = pizzas["amount"] * pizzas["price"];
        div.innerHTML += generatePriceHTML(
            pizzas["type"],
            pizzas["price"].toFixed(2),
            pizzas["amount"],
            i,
            "pizzas",
            pricing.toFixed(2)
        );
    }
}

function loadPasta() {
    let pasta = food["pastas"];
    let image = food["images"][1];
    let div = document.getElementById("food-insert");
    div.innerHTML += generateCardTitle(image["src"], image["name"]);

    for (let i = 0; i < pasta.length; i++) {
        const pastas = pasta[i];
        let pricing = pastas["amount"] * pastas["price"];
        div.innerHTML += generatePriceHTML(
            pastas["type"],
            pastas["price"],
            pastas["amount"],
            i,
            "pastas",
            pricing
        );
    }
}

function loadSalad() {
    let salad = food["salads"];
    let image = food["images"][2];
    let div = document.getElementById("food-insert");
    div.innerHTML += generateCardTitle(image["src"], image["name"]);
    for (let i = 0; i < salad.length; i++) {
        const salads = salad[i];
        let pricing = salads["amount"] * salads["price"];
        div.innerHTML += generatePriceHTML(
            salads["type"],
            salads["price"],
            salads["amount"],
            i,
            "salads",
            pricing,

        );
    }
}

/**
 *
 * This function generates the beginning of each food category
 *
 *
 * @param {object} img - image of the food category
 * @param {object} name - name of the food category
 */
function generateCardTitle(img, name) {
    return `<div class="menucard-mealsgroup" id=${name}>
                <img class="category-image" src="${img}">                
                <div class="item-name">
                    <h2>${name}</h2>
                </div>
            </div>`;
}

/**
 *
 * This function generates the a list of meal to choose of each food category
 *
 *
 * @param {string} type - name of each meal
 * @param {number} price  - price of each mail
 * @param {number} amount - amount of each meal
 * @param {number} i  - number of each meal
 * @param {object} category - category of each food category
 */
function generatePriceHTML(type, price, amount, i, category, pricing) {
    return `<div class="meal-container meal-container-discription">
                <div class="meal-container-name" >
                    <span class="meal-name">${type}</span>
                    <div class="meal-price">${price} €</div>
                </div>    
                <div class="number">  
                    <div class="number-count"> 
                        <a onclick="reduceAmount('${category}',${i})">-</a> ${amount} <a onclick="increaseAmount('${category}', ${i})">+</a>
                    </div>
                    <button class ="btn btn-primary" onclick="addToBasket('${category}',${i})"> ${pricing} €</button> 
                </div>
            </div>`;
}

/**
 *
 * This function will increase the amount
 *
 *
 * @param {object} category - category of the meal
 * @param {number} i - number of the each meal
 */
function increaseAmount(category, i) {
    if (food[category][i]["amount"] <= 1) {
        food[category][i]["amount"]++;
    } else {
        food[category][i]["amount"]++;
    }

    loadHTML();
}

/**
 * This function will reduce the amount
 * @param {object} category - category of the meal
 * @param {number} i - number of the each meal
 */
function reduceAmount(category, i) {
    food[category][i]["amount"]--;
    if (food[category][i]["amount"] <= 1) {
        food[category][i]["amount"] = 1;
    }

    loadHTML();
}

/**
 * This function will add the meal to the basket
 *
 * @param {object} category - category of the meal
 *  @param {number} i - number of the each meal
 */
function addToBasket(category, i) {
    const clone = JSON.parse(JSON.stringify(food[category][i]));
    food[category][i]["amount"] = 1;
    loadHTML();
    showBasket(clone);
}

/**
 * Search funktion
 *
 * @param {} $event
 */

function filterMeals($event) {
    $event.preventDefault();
    let search = document.getElementById("search").value;
    search = search.toLowerCase();

    document.getElementById("food-insert").innerHTML = "";
    searchPasta(search);
    searchPizza(search);
    searchSalad(search);
}

function searchPizza(search) {
    let pizza = food["pizzas"];
    let div = document.getElementById("food-insert");
    for (let i = 0; i < pizza.length; i++) {
        const pizzas = pizza[i];
        if (pizzas["type"].toLowerCase().includes(search)) {
            div.innerHTML += generatePriceHTML(
                pizzas["type"],
                pizzas["price"].toFixed(2),
                pizzas["amount"],
                i,
                "pizzas",
                pricing.toFixed(2)
            );
        }
    }
}

function searchPasta(search) {
    let pasta = food["pastas"];
    let div = document.getElementById("food-insert");
    for (let i = 0; i < pasta.length; i++) {
        const pastas = pasta[i];
        if (pastas["type"].toLowerCase().includes(search)) {
            div.innerHTML += generatePriceHTML(
                pastas["type"],
                pastas["price"].toFixed(2),
                pastas["amount"],
                i,
                "pastas",
                pricing.toFixed(2)
            );
        }
    }
}

function searchSalad(search) {
    let salad = food["salads"];
    let div = document.getElementById("food-insert");
    for (let i = 0; i < salad.length; i++) {
        const salads = salad[i];

        if (salads["type"].toLowerCase().includes(search)) {
            div.innerHTML += generatePriceHTML(
                salads["type"],
                salads["price"].toFixed(2),
                salads["amount"],
                i,
                "salads",
                pricing.toFixed(2)
            );
        }
    }
}