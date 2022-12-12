import {menuArray} from "./data.js";

const foodSectionEl = document.querySelector(".food-section");
const yourOrderContainerEl = document.querySelector(".your-order-container")
let totalPrice = 0


menuArray.forEach(function(food){
    foodSectionEl.innerHTML += `
        <div class="diner-section-container">
            <div class="food">
                <div class="food-image">
                    <p>${food.emoji}</p>
                </div>
                <div class="food-info">
                    <p class="food-name">${food.name}</p>
                    <p class="food-ingredient">${food.ingredients}</p>
                    <p class="food-price">$${food.price}</p>
                </div>
            </div>
            <div class="add-button-container">
                <i class="fa-solid fa-circle-plus add-button" data-id="${food.id}"></i>
            </div>
        </div>
    `
})

document.querySelectorAll(".add-button").forEach(addButton => {
    addButton.addEventListener("click", (e) => {
        makeYourOrder(e.target.dataset.id);
    })
})

function makeYourOrder(foodId) {
    
    const yourOrderListEl = document.querySelector(".your-order-list")
    yourOrderContainerEl.style.display = "block";
    yourOrderListEl.style.display = "block";
    totalPrice += menuArray[foodId].price
    
    
    yourOrderListEl.innerHTML += 
    `<div class="your-order">
        <div class="your-food">
            <p>${menuArray[foodId].name}</p>
            <p class="remove-btn" data-foodid="${foodId}">remove</p>
        </div>
        <div class="your-price">
            <p>${menuArray[foodId].price}</p>
        </div>
    </div>
    `
    
    document.querySelectorAll(".remove-btn").forEach(removeButton => {
        removeButton.addEventListener("click", (e) => {
            removeFoodFromOrderList(e.target.parentNode.parentNode, e.target.dataset.foodid)
        })
    })
    renderTotalPrice(totalPrice)
}


function renderTotalPrice(totalPrice) {
    document.querySelector(".total-price").innerHTML = 
        `
        <p>Total Price:</p>
        <p id="total-price-id">$${totalPrice}</p>
        `
}


document.getElementById("card-number").addEventListener("input", () => {
    if(document.getElementById("card-number").value.length > 16){
        document.getElementById("card-number").value = document.getElementById("card-number").value.slice(0, 16)
    }
})

document.getElementById("cvv").addEventListener("input", () => {
    if(document.getElementById("cvv").value.length > 3){
        document.getElementById("cvv").value = document.getElementById("cvv").value.slice(0,3)
    }
})


document.getElementById("complete-order-button").addEventListener("click", () => {
    document.querySelector(".paywall-section").style.display = "flex";
    document.querySelector(".menu-section-container").classList.add("disabled");
})

document.getElementById("pay-btn").addEventListener("click", (e) => {
    e.preventDefault()
    pay()
})

function pay() {
    const customerName = document.getElementById("name").value;
    const paywallSectionEl = document.querySelector(".paywall-section");

    paywallSectionEl.style.display = "none"
    
    //document.querySelector(".menu-section-container").classList.remove("disabled");
    completeMessage(customerName)
}

function completeMessage(customerName){
    const completeMsg = document.querySelector(".completed-order-message");
    yourOrderContainerEl.style.display = "none"
    totalPrice = 0
    completeMsg.style.display = "block"
    completeMsg.innerHTML = 
    `
    <p>Thanks, ${customerName}! Your order is on its way!</p>
    `
    document.querySelector(".diner-section-container").classList.add("disabled")
}

function removeFoodFromOrderList(e, id) {
    totalPrice -= menuArray[id].price;
    if(totalPrice <= 0){
        yourOrderContainerEl.style.display = "none";
    }
    e.remove()
    renderTotalPrice(totalPrice)
}