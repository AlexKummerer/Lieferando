/**
 * This function generates HTMl Content
 */
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
    let image = food["images"][1];
    let div = document.getElementById("food-insert");
    div.innerHTML += generateCardTitle(image["src"], image["name"]);

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
    let image = food["images"][2];
    let div = document.getElementById("food-insert");
    div.innerHTML += generateCardTitle(image["src"], image["name"]);
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
function generatePriceHTML(type, price, amount, i, category) {
    return `<div class="meal-container meal-container-discription">
                <div class="meal-container-name" >
                    <span class="meal-name">${type}</span>
                    <div class="meal-price">${price} €</div>
                </div>    
                <div class="number">  
                    <div class="number-count"> 
                        <a onclick="reduceAmount('${category}',${i})">-</a> ${amount} <a onclick="increaseAmount('${category}',${i})">+</a>
                    </div>
                    <button class ="btn btn-primary" onclick="addToBasket('${category}', ${i})">Hinzufügen</button> 
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
        const element = pizza[i];
        if (element["type"].toLowerCase().includes(search)) {
            div.innerHTML += generatePriceHTML(
                element["type"],
                element["price"].toFixed(2),
                element["amount"],
                i,
                "pizzas"
            );
        }
    }
}

function searchPasta(search) {
    let pasta = food["pastas"];
    let div = document.getElementById("food-insert");
    for (let i = 0; i < pasta.length; i++) {
        const element = pasta[i];
        if (element["type"].toLowerCase().includes(search)) {
            div.innerHTML += generatePriceHTML(
                element["type"],
                element["price"].toFixed(2),
                element["amount"],
                i,
                "pastas"
            );
        }
    }
}

function searchSalad(search) {
    let salad = food["salads"];
    let div = document.getElementById("food-insert");
    for (let i = 0; i < salad.length; i++) {
        const element = salad[i];

        if (element["type"].toLowerCase().includes(search)) {
            div.innerHTML += generatePriceHTML(
                element["type"],
                element["price"].toFixed(2),
                element["amount"],
                i,
                "salads"
            );
        }
    }
}