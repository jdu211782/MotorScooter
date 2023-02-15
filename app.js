import products from "./products.json" assert { type: "json" };
const content = document.querySelector(".left-bar");
let cart = ['1', '5'];
const total_price = document.querySelector(".total_price");

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
  content.innerHTML += product;
}

document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", function (e) {
    cart.push(e.target.dataset.id);
    renderCart(e.target.dataset.id);
    total();
  });
});

document.querySelector(".clearCart").onclick = function(){
  cart = [];
  renderCart();
  total();
}

function renderCart(id) {
  document.querySelector(".upSide").innerHTML = "";

  cart.forEach(itemId => {

    document.querySelector(".upSide").innerHTML += `
    <div class="small_cart">
      <img class="small_image" src="./images/${products[itemId-1].image}">
      <div class="small_cart_content">
        Name: ${products[itemId-1].name} <br>
        Price: ${products[itemId-1].price}${products[itemId-1].currency} <br>
      </div>
      <div class="button"> 
        <button class="delete" data-id="${products[itemId-1].id}">delete</button>
      </div>
    </div> 
    `;
  })

  document.querySelectorAll(".delete").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      // this.parentNode.parentNode.remove();
      cart.forEach((itemId, index) => {
        if(itemId == e.target.dataset.id) {
          cart.splice(index, 1);
        }
      })
      renderCart();
      total();
    });
  });
}

function total() {
  const onlyTotal = document.querySelector(".totalPrice");
  let totalPrice = 0;

  if(cart.length > 0) {
    cart.forEach((item) => {
      totalPrice += products[item - 1].price;
    });  
  }
  onlyTotal.innerHTML = "Total: $" + totalPrice;

}

total();
renderCart();
