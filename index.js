const { setEngine } = require("node:crypto")

let menu = [
  { name: "Margerita", price: 10 },
  { name: "Pepperoni", price: 12 },
  { name: "Hawaiian", price: 11 }
]
let cashInRegister = 100
let orderQueue = []
let orderId = 1

function addMenuItem({ name, price }) {
  menu.push({ name, price })
}

function placeOrder(itemName) {
  const selectedPizza = menu.find((item) => item.name === itemName)
  cashInRegister += selectedPizza.price
  const newOrder = {
    id: orderId++,
    pizza: selectedPizza,
    status: "Ordered"
  }
  orderId++
  orderQueue.push(newOrder)
}

function completeOrder(orderId) {
  const order = orderQueue.find((orderObj) => orderObj.id === orderId)
  if (order) {
    order.status = "Completed"
  }
  return order
}

addMenuItem({ name: "Veggie", price: 9 })
console.log(menu)
placeOrder("Margerita")
placeOrder("Pepperoni")
placeOrder("Veggie")
console.log(orderQueue)
completeOrder(1)
console.log(orderQueue)
console.log(`Cash in register: $${cashInRegister}`)