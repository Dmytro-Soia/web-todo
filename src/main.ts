import './style.css'

const input = document.querySelector<HTMLInputElement>('#todo-input')
const button = document.querySelector<HTMLButtonElement>('#add-todo-button')
const storage = document.querySelector<HTMLUListElement>('#todo-storage')

function addTodo(input: HTMLInputElement): void {
  if (storage) {
    const todo_li = document.createElement('li')
    todo_li.innerText = input.value
    todo_li.classList.add('todo-element')
    storage.append(todo_li)
  }
}

if (input) {
  input.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo(input)
    }
  })
}

if (button) {
  button.addEventListener('click', () => {
    if (input) {
      addTodo(input)
    }
  })
}
