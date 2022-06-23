const form = (document.getElementById("newItem"))
const list = document.getElementById("list")
const items = JSON.parse(localStorage.getItem("items")) || []

items.forEach((element) => {
  createListElement(element)
})


form.addEventListener("submit", (event) => {
  event.preventDefault()

  const name = event.target.elements['name']
  const quantity = event.target.elements['quantity']

  const existentItem = items.find(element => element.name === name.value)

  const currentItem = {
    "name": name.value,
    "quantity": quantity.value
  }

  if (existentItem) {
    currentItem.id = existentItem.id
    updateElement(currentItem)

    //to update item in localStorage (writing over it)
    items[items.findIndex(element => element.id === existentItem.id)] = currentItem
  } else {
    currentItem.id = items[items.length - 1] ? (items[items.length - 1]).id + 1 : 0;

    createListElement(currentItem)
    items.push(currentItem)
  }


  localStorage.setItem = ("items", JSON.stringify(items))

  name.value = ""
  quantity.value = ""
})

function createListElement(item) {

  const newItem = document.createElement('li')
  newItem.classList.add("item")

  const itemNumber = document.createElement('strong')

  itemNumber.innerHTML = item.quantity
  itemNumber.dataset.id = item.id //adds an id on each element
  newItem.appendChild(itemNumber) //appendChild inserts one element inside of the other

  newItem.innerHTML += item.name

  newItem.appendChild(deleteButton())
  list.appendChild(newItem)

}

function updateElement(item) {
  //search a data attribute (the id)
  document.querySelector("[data-id='" + item.id + "']").innerHTML = item.quantity
}

function deleteButton() {
  const elementButton = document.createElement("button")
  elementButton.innerText = "x"

  elementButton.addEventListener("click", function() {
    removeItem(this.parentNode, this.id)
  })

  return elementButton
}

function removeItem(tag, id) {
  tag.remove()

  items.splice(items.findIndex(element => element.id === id), 1)
  localStorage.setItem("items", JSON.stringify(items))

}
