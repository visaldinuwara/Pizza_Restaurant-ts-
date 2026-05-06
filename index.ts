const { setEngine } = require("node:crypto")

type pizzaType = {
  id: number
  name: string
  price: number
}

type orderType = {
  id: number
  pizza: pizzaType
  status: "Ordered" | "Completed"
}
type updatePizzaType=Partial<pizzaType>

let cashInRegister: number = 100
let orderQueue: orderType[] = []
let orderId: number = 1
let nextPizzaId: number = 1

let menu: pizzaType[] = [
  { id: nextPizzaId++, name: "Margerita", price: 10 },
  { id: nextPizzaId++, name: "Pepperoni", price: 12 },
  { id: nextPizzaId++, name: "Hawaiian", price: 11 }
]

function addMenuItem( pizzaItem:Omit<pizzaType,"id">): void {
  let id = nextPizzaId++
  let menuItem:pizzaType={id:id,name:pizzaItem.name,price:pizzaItem.price};
  menu.push()
}

function placeOrder(itemName: string): void {
  const selectedPizza = menu.find((item) => item.name === itemName)
  if (selectedPizza) {
    cashInRegister += selectedPizza.price
    const newOrder: orderType = {
      id: orderId++,
      pizza: selectedPizza,
      status: "Ordered"
    }
    orderId++
    orderQueue.push(newOrder)
  }
}

function completeOrder(orderId): orderType | undefined {
  const order = orderQueue.find((orderObj) => orderObj.id === orderId)
  if (!order) {
    console.log(`${orderId} order is not found!`)
    return
  }
  order.status = "Completed"
  return order
}

function getPizzaByIdentifier(identifier: string | number): pizzaType | undefined {
  if (typeof identifier === "string") {
    return menu.find((menuObj) => {
      { menuObj.name.toLowerCase() === identifier.toLowerCase() }
    })
  } else if (typeof identifier === "number") {
    return menu.find((menuObj) => {
      { menuObj.id === identifier }
    })
  } else {
    throw new TypeError("Parameter `identifier` be either a number or a string")
  }
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

function addToArray<T>(array:T[],item:T):T[]{
  array.push(item)
  return array
}

addToArray<pizzaType>(menu,{id:nextPizzaId++,name:"Pasta",price:10})
addToArray<orderType>(orderQueue,{id:orderId++,pizza:{id:nextPizzaId++,name:"Pasta",price:10},status:"Ordered"})

console.log(menu)
console.log(orderQueue)




