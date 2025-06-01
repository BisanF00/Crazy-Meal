"use strict";

function Meals (name, price, image) {
  this.name = name ;
  this.price = price ;
  this.image = image ;

  this.order = function(){
    return `${this.name} ${this.price} ${this.image}`;
  };
}

let base64Image = ""; 
const form = document.getElementById ("mealsForm");
const fileInput = document.getElementById("image");
const ordersAdded = document.getElementById ("orders-added");
let meal = [];

// getLocalStorage ();

fileInput.addEventListener("change",function (event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    base64Image = e.target.result;
    document.getElementById("output").src = base64Image;
  };

  if (file) {
    reader.readAsDataURL(file);
  }
})

form.addEventListener ("submit", function(event) {
  event.preventDefault ();

  const name = document.getElementById ("name").value.trim();
  const price = document.getElementById ("price").value.trim();
  const image = base64Image;

  if (!name || !price || !image) {
    alert("Please check if all the inputs is filled");
    return;
  }

  const newMeal = new Meals (name, price, image);

  meal.push(newMeal);
  setLocalStorage ();
  renderMeal();
})

function renderMeal (){
  ordersAdded.innerHTML = "";

  meal.forEach((crazymeal,index) => {
    const listItem = document.createElement ("div");

    const imageSrc = crazymeal.image.startsWith("data:image/")
      ? crazymeal.image
      : "";

    listItem.innerHTML = `<div class="card-content">
    <img class="cardImage" src="${crazymeal.image}">
    <div class="cardInformation">
    <p>${crazymeal.name}</p>
    <p>${crazymeal.price} JOD</p>
    </div>
    <button class="deletebtn" onclick="deleteMeal(${index})">Delete</button>
    </div>`;

    ordersAdded.appendChild(listItem);
  });
}

function deleteMeal (index){
  meal.splice(index,1);
  setLocalStorage ();
  renderMeal();
}

function setLocalStorage (){
  localStorage.setItem ("ordersAdded",
    JSON.stringify(meal));
}

function getLocalStorage (){
  const orderList = localStorage.getItem ("ordersAdded");

  if (orderList) {
    const storedMeals = JSON.parse(orderList);
    storedMeals.forEach ((m) => {
      const chickenMeal = new Meals (m.name, m.price, m.image);
      meal.push(chickenMeal);
    });
    renderMeal();
  }
}

getLocalStorage ();
