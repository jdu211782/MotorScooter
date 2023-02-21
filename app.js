import products from "./products.json" assert { type: "json" };
const content = document.querySelector(".left-bar");
let cart = [];
const total_price = document.querySelector(".total_price");
let counters = 0; 
for (let i = 0; i < products.length; i++) {
  let product = `
    <div class="left">
    <div class="yon">
      <div class= "cart">
          <div><img class= "image" src="images/${products[i].image}"></div>
      </div>
      <div class="cart_content">
       ${products[i].name}<br>
       ${products[i].currency}${products[i].price}<br>
       <div class= "character"> ${products[i].character}<br></div> 
      <div class="btn">
      <button class="b" data-id="${products[i].id}">Add to cart</button>
      </div>
      </div>
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
    counters++;
    InnerCount();
  });
});

document.querySelector(".clearCart").onclick = function(){
  cart = [];
  renderCart();
  total();
  counters = 0;
  InnerCount();

};




function InnerCount(){
  document.querySelector("#count").innerHTML =  counters;
}

function renderCart(id) {
  document.querySelector(".upSide").innerHTML = "";

  cart.forEach(itemId => {
    document.querySelector(".upSide").innerHTML += `
    <div class="small_cart">
    <div class="yon">
      <img class="small_image" src="./images/${products[itemId-1].image}">
      <div class="small_cart_content">
         ${products[itemId-1].name} <br>
         ${products[itemId-1].price}${products[itemId-1].currency} <br>
        <div class="button"> 
        <button class="delete" data-id="${products[itemId-1].id}">delete</button>
      </div>
      </div>
      </div>
    </div> 
    `;
  })

  document.querySelectorAll(".delete").forEach((btn) => {
    
    btn.addEventListener("click", function (e) {
      // this.parentNode.parentNode.remove();
      cart.every((itemId, index) => {
        if(itemId == e.target.dataset.id) {
          cart.splice(index, 1);
          return false;
        }
        return true;
      })
      renderCart();
      total();
      counters--;
      InnerCount();
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
  document.querySelector(".Buy").onclick = function(){
    alert("Your purchase is $" + totalPrice);
    cart = [];
    renderCart();
    total();
  };
}
total();
renderCart();

let cartIcon = document.querySelector('.cart-icon');
let rightBar = document.querySelector('.right-bar');
let closeCart = document.querySelector('#close-cart');

cartIcon.onclick = () => {
    rightBar.classList.add("active");
};

closeCart.onclick = () => {
    rightBar.classList.remove("active");
}
