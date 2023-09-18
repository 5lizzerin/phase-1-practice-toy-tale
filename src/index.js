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
const toyCollection = document.querySelector("#toy-collection")

fetch(toyUrl)
  .then(response => response.json())
  .then(data => {
    for (const toy of data){
      createCard(toy)
    }
    const addToyForm = document.querySelector("form.add-toy-form")
    addToyForm.addEventListener("submit",(e)=>{
      e.preventDefault()
      const inputs = e.target.querySelectorAll("input")
      const newName = inputs[0].value
      const newImgUrl = inputs[1].value
      fetch(toyUrl, {
        method: "POST",
        headers:
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "name": newName,
          "image": newImgUrl,
          "likes": 0
        })
      }).then(res => res.json())
      .then(toy => createCard(toy))
      e.target.reset()
    })
  })

function createCard(toy){
  const toyCard = document.createElement("div")
  toyCard.className = "card"
  const toyName = document.createElement("h2")
  toyName.textContent = toy.name
  const toyImage = document.createElement("img")
  toyImage.setAttribute("src", toy.image)
  toyImage.className = "toy-avatar"
  const toyLikes = document.createElement("p")
  const numLikes = toy.likes
  toyLikes.innerHTML = `<span>${numLikes}</span> Likes`
  const likeButton = document.createElement('button')
  likeButton.className = "like-btn"
  likeButton.id = toy.id
  likeButton.textContent = "Like ❤️"
  setupLiker(likeButton)
  toyCard.append(toyName, toyImage, toyLikes, likeButton)
  toyCollection.append(toyCard)
}
    // add event listened to each like button to add 1 to the like count
    
function setupLiker (button){
  button.addEventListener("click",(e)=>{
    const toyId = e.target.id
    const currentLikes = parseInt(e.target.parentNode.querySelector("span").textContent)
    const newLikes = currentLikes + 1 
    fetch(`http://localhost:3000/toys/${toyId}`,{
      method: "PATCH",
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({"likes": newLikes})
    }).then(res => res.json())
    .then(data => e.target.parentNode.querySelector("span").textContent = newLikes)
    })} 



