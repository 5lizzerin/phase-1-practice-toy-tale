let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

//create a card for each toy in json file
//those cards will be added to a div in doc called "Toy Collection"


//create a card
//give each card info about toy that we get from json server
//append to toy collection

const toyUrl = "http://localhost:3000/toys";

fetch(toyUrl)
  .then(response => response.json())
  .then(data => {
    for (const toy of data){
      const toyCard = document.createElement("div")
      toyCard.className = "card"
      const toyName = document.createElement("h2")
      toyName.textContent = toy.name 
    }
    }



  )
