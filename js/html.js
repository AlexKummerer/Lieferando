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
    showBasketPlaceholder()
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
                <div class="number">  <div> <a onclick="reduceAmount('${category}',${i})">-</a> ${amount} <a onclick="increaseAmount('${category}',${i})">+</a> </div>
                <button class ="btn btn-primary" onclick="addToBasket('${category}', ${i})">Hinzufügen</button>  </div>
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

function addToBasket(category, i) {
    const clone = JSON.parse(JSON.stringify(food[category][i]));
    food[category][i]["amount"] = 1;
    loadHTML();
    showBasket(clone);
}