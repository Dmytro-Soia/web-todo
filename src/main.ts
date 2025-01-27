import './style.css'

const input = document.querySelector<HTMLInputElement>('#todo-input')
const button = document.querySelector<HTMLButtonElement>('#add-todo-button')
const storage = document.querySelector<HTMLUListElement>('#todo-storage')
let json_storage: string[] = []

function set_ls() {
  json_storage = JSON.parse(localStorage.getItem('ls_item:') || '[]')

  if (storage)
    for (const element of json_storage) {
      const todo_li = document.createElement('li')
      todo_li.innerText = element
      todo_li.classList.add('todo-element')
      storage.append(todo_li)
    }
}

set_ls()

function addTodo(input: HTMLInputElement) {
  if (storage) {
    const todo_li = document.createElement('li')
    todo_li.innerText = input.value
    todo_li.classList.add('todo-element')
    storage.append(todo_li)
  }
}

function addToStorage() {
  if (input) {
    json_storage.push(input.value)
    localStorage.setItem('ls_item:', JSON.stringify(json_storage))
  }
}

if (input) {
  input.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo(input)
      addToStorage()
    }
  })
}

if (button) {
  button.addEventListener('click', () => {
    if (input) {
      addTodo(input)
      addToStorage()
    }
  })
}
