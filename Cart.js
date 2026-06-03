let continueShoppingBtn = document.querySelector("nav>button")
let cartLength = document.querySelector(".cart_length")
let cartItemsContainer = document.querySelector(".cart_items_container")
let subTotalPrice = document.querySelector(".total_price")
let placeOrderBtn = document.querySelector(".place_order_btn")

continueShoppingBtn.addEventListener("click", () => {
  location.href = "index.html"
})

let cartItems = JSON.parse(localStorage.getItem("cart")) || []

let totalQty = 0
let totalPriceAmount = 0

function displayProducts() {
  if (cartItems.length === 0) {
    cartLength.innerHTML = "0 Items"
    cartItemsContainer.innerHTML = `
       <h2>Your Cart Is Empty 🛒</h2>
      <p>Add some amazing products from Lumen.</p>
    `
    subTotalPrice.innerHTML = `$0.00`
    return
  }

  cartItems.forEach((product) => {
    totalQty += product.qty
    totalPriceAmount += product.qty * product.price
  })

  cartLength.innerHTML = `${totalQty} Items`

  cartItems.forEach((product,index) => {
    cartItemsContainer.innerHTML += `
      <section class=cart_product>
        <img src=${product.img} alt=${product.title} height=150 width=150>
        <div>
           <h1>${product.title}</h1>
           <h3>$${product.price}</h3>
           <p>Quantity:${product.qty}</p>
        </div>
        <button class=delete_btn data-id=${index}><i class="fa-solid fa-trash"></i> Delete</button>
      </section>
    `
  })

  let deleteBtn = document.querySelectorAll(".delete_btn")
  deleteBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      let deleteBtnIndex = btn.dataset.id
      cartItems.splice(deleteBtnIndex, 1)
      localStorage.setItem("cart", JSON.stringify(cartItems))
      location.reload()
    })
  })
  
  subTotalPrice.innerHTML = `$${totalPriceAmount.toFixed(2)}`
}
// displayProducts()

placeOrderBtn.addEventListener("click", () => {
  if (cartItems.length === 0) {
    alert("Your Cart is Empty")
    return
  }
  let uniqueId = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000
  alert(`
     Your Order ID is :LUM${uniqueId}
     Thankyou for shopping 😁 Visit Again
    `)
  localStorage.removeItem("cart")
  location.href = "index.html"
})

displayProducts()