import {menuArray} from "./data.js";

const foodSectionEl = document.querySelector(".food-section");
const yourOrderContainerEl = document.querySelector(".your-order-container")
const yourOrderListEl = document.querySelector(".your-order-list")
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
    
    const yourOrderContainerEl = document.querySelector(".your-order-container")
    const yourOrderListEl = document.querySelector(".your-order-list")
    yourOrderContainerEl.style.display = "block";
    yourOrderListEl.style.display = "block";
    totalPrice += menuArray[foodId].price
    
    
    yourOrderListEl.innerHTML += 
    `<div class="your-order">
        <div class="your-food">
            <p>${menuArray[foodId].name}</p>
            <p class="remove-btn">remove</p>
        </div>
        <div class="your-price">
            <p>${menuArray[foodId].price}</p>
        </div>
    </div>
    `
    
    document.querySelectorAll(".remove-btn").forEach(removeButton => {
        removeButton.addEventListener("click", (e) => {
            console.log("FOOD ID: " + e.target.getAttribute("class")) //silinecek price'ı alamıyorum bir türlü
            removeFoodFromOrderList(e.target.parentNode.parentNode, e.target.dataset.foodId)
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

function removeFoodFromOrderList(e, id) {
    totalPrice -= menuArray[id].price;
//    e.remove()
    renderTotalPrice(totalPrice)
}