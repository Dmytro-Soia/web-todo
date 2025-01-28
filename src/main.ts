import './style.css'

const input = document.querySelector<HTMLInputElement>('#todo-input')
const button = document.querySelector<HTMLButtonElement>('#add-todo-button')
const storage = document.querySelector<HTMLUListElement>('#todo-storage')
let json_storage: string[] = []
let checked_box: boolean[] = []

// create body of todo with input text, index and checkbox
function displayTodo(todoText: string, index: number, isChecked: boolean) {
  if (storage) {
    const todo_li = document.createElement('li')
    todo_li.innerText = todoText
    todo_li.classList.add('todo-element')

    const checkbox = document.createElement('INPUT') as HTMLInputElement
    checkbox.setAttribute('type', 'checkbox')
    checkbox.classList.add('checkbox')
    checkbox.checked = isChecked

    checkbox.addEventListener('change', () => {
      checked_box[index] = checkbox.checked
      localStorage.setItem('checked', JSON.stringify(checked_box))
    })


    const deleted_button = document.createElement('button')
    deleted_button.innerText = "Delete"

    deleted_button.addEventListener('click', () => {
      json_storage = JSON.parse(localStorage.getItem('ls_item') || '[]')
      checked_box = JSON.parse(localStorage.getItem('checked') || '[]')
      json_storage.splice(index, 1)
      checked_box.splice(index, 1)
      localStorage.setItem('ls_item', JSON.stringify(json_storage));
      localStorage.setItem('checked', JSON.stringify(checked_box));
      todo_li.remove()
    })


    todo_li.appendChild(checkbox)
    todo_li.appendChild(deleted_button)
    storage.append(todo_li)
    console.log(index)
  }
}

function set_items_into_ls() {
  json_storage = JSON.parse(localStorage.getItem('ls_item') || '[]')
  checked_box = JSON.parse(localStorage.getItem('checked') || '[]')

  json_storage.forEach((todoText, index) => {
    displayTodo(todoText, index, checked_box[index] || false)
  })
}

set_items_into_ls()

function addTodo() {
  if (input) {
    const newIndex = json_storage.length
    displayTodo(input.value, newIndex, false)
  }
}

function addTodoToStorage() {
  if (input) {
    json_storage.push(input.value)
    localStorage.setItem('ls_item', JSON.stringify(json_storage))
    localStorage.setItem('checked', JSON.stringify(checked_box))

    console.log(json_storage)
  }
}

if (input) {
  input.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo()
      addTodoToStorage()
    }
  })
}

if (button) {
  button.addEventListener('click', () => {
    if (input) {
      addTodo()
      addTodoToStorage()
    }
  })
}
