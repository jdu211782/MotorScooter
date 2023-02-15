import products from "./products.json" assert { type: "json" };
const content = document.querySelector(".left-bar");
const cart = []
// const totalPrice = document.querySelector( ".totalPrice")

for (let i = 0; i < products.length; i++) {
  let product = `
    <div class="left">
      <div class= "cart">
          <div><img class= "image" src="images/${products[i].image}"></div>
      </div>
      <div class="cart_content">
      Name: ${products[i].name}<br>
      Price: ${products[i].currency}${products[i].price}<br>
      </div>
      <div class="btn">
      <button data-id="${products[i].id}">Add to cart</button>
      </div>
    </div>
  `;
  content.innerHTML +=product;
}
 

document.querySelectorAll(".btn").forEach ( (button) => {
    button.addEventListener("click", function(e) {
        cart.push(e.target.dataset.id); 
        renderCart(e.target.dataset.id);
        console.log(cart);
    })
})

function renderCart(id){
  let box;
  for (let i = 0,len = products.length; i < len; i++) {
      if(products[i].id == id) {
          box = products[i];
          break;
      }   
  }
  document.querySelector('.right-bar').innerHTML +=`
  <div class="small_cart">
    <img class="small_image" src="./images/${box.image}">
    <div class="small_cart_content">
      Name: ${box.name} <br>
      Price: ${box.price}${box.currency} <br>
    </div>
    <div class="button"> 
      <button class="delete" data-id="${box.id}">delete</button>
    </div>
  </div> 
  `
  document.querySelectorAll(".delete").forEach(btn=>{
    btn.addEventListener('click', function(e){
      this.parentNode.parentNode.remove()
    })
  })
}

// function total(id) { 
//   let total = 0;
//   total = box.price * box.id;}

