const { setEngine } = require("node:crypto")

type  pizzaType={name:string,price:number}
type orderType={id:number,pizza:pizzaType,status:string}

let menu:pizzaType[]= [
  { name: "Margerita", price: 10 },
  { name: "Pepperoni", price: 12 },
  { name: "Hawaiian", price: 11 }
]
let cashInRegister:number = 100
let orderQueue:orderType[] = []
let orderId:number = 1

function addMenuItem({ name, price }) {
  menu.push({ name, price })
}

function placeOrder(itemName:string) {
  const selectedPizza= menu.find((item) => item.name === itemName)
  if(selectedPizza){
  cashInRegister += selectedPizza.price
  const newOrder:orderType = {
    id: orderId++,
    pizza: selectedPizza,
    status: "Ordered"
  }
  orderId++
  orderQueue.push(newOrder)
}
}

function completeOrder(orderId) {
  const order = orderQueue.find((orderObj) => orderObj.id === orderId)
  if (!order) {
    console.log(`${orderId} order is not found!`)
    return
  }
  order.status = "Completed"
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