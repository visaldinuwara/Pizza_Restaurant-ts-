const { setEngine } = require("node:crypto")

type  pizzaType={id:number,name:string,price:number}
type orderType={id:number,pizza:pizzaType,status:"Ordered" | "Completed"}

let menu:pizzaType[]= [
  { id:1,name: "Margerita", price: 10 },
  { id:2,name: "Pepperoni", price: 12 },
  { id:3,name: "Hawaiian", price: 11 }
]
let cashInRegister:number = 100
let orderQueue:orderType[] = []
let orderId:number = 1

function addMenuItem({ id,name, price }):void {
  menu.push({ id,name, price })
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

function getPizzaByIdentifier(identifier: string | number):pizzaType | undefined{
  if(typeof identifier ==="string"){
    return menu.find((menuObj)=>{
      {menuObj.name.toLowerCase()===identifier.toLowerCase()}
    })
  }else if(typeof identifier ==="number"){
    return menu.find((menuObj)=>{
    {menuObj.id===identifier}
  })
}else{
    throw new TypeError("Parameter `identifier` be either a number or a string")
}
}

addMenuItem({ id:4,name: "Veggie", price: 9 })
console.log(menu)
placeOrder("Margerita")
placeOrder("Pepperoni")
placeOrder("Veggie")
console.log(orderQueue)
completeOrder(1)
console.log(orderQueue)
console.log(`Cash in register: $${cashInRegister}`)