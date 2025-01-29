import './style.css'

const input = document.querySelector<HTMLInputElement>('#todo-input')
const button = document.querySelector<HTMLButtonElement>('#add-todo-button')
const storage = document.querySelector<HTMLUListElement>('#todo-storage')
const delete_all = document.querySelector<HTMLButtonElement>('#delete-all')
const date = document.querySelector<HTMLInputElement>('#todo-date')
let json_storage: string[] = []
let checked_box: boolean[] = []
let due_date: Date[] = []

// create body of todo with input text, index and checkbox
function displayTodo(
  todoText: string,
  index: number,
  isChecked: boolean,
  data: string,
) {
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
    deleted_button.innerText = 'Delete'

    deleted_button.addEventListener('click', () => {
      json_storage = JSON.parse(localStorage.getItem('ls_item') || '[]')
      checked_box = JSON.parse(localStorage.getItem('checked') || '[]')
      due_date = JSON.parse(localStorage.getItem('date') || '[]')
      json_storage.splice(index, 1)
      checked_box.splice(index, 1)
      due_date.splice(index, 1)
      localStorage.setItem('ls_item', JSON.stringify(json_storage))
      localStorage.setItem('checked', JSON.stringify(checked_box))
      localStorage.setItem('date', JSON.stringify(due_date))
      todo_li.remove()
    })

    const add_date = document.createElement('li')
    if (data) {
      add_date.innerText = data
    } else {
      const no_due_date = document.createElement('p')
      no_due_date.innerText = 'No due date'
      add_date.append(no_due_date)
    }
    add_date.classList.add('todo-date-element')
    localStorage.setItem('date', JSON.stringify(due_date))

    todo_li.appendChild(checkbox)
    todo_li.appendChild(deleted_button)
    todo_li.append(add_date)
    storage.append(todo_li)
  }
}

function set_items_into_ls() {
  json_storage = JSON.parse(localStorage.getItem('ls_item') || '[]')
  checked_box = JSON.parse(localStorage.getItem('checked') || '[]')
  due_date = JSON.parse(localStorage.getItem('date') || '[]')

  json_storage.forEach((todoText, index) => {
    displayTodo(
      todoText,
      index,
      checked_box[index],
      due_date[index] as unknown as string,
    )
  })
}

set_items_into_ls()

function addTodo() {
  if (input && date) {
    const newIndex = json_storage.length
    displayTodo(input.value, newIndex, false, date.value)
  }
}

function addTodoToStorage() {
  if (input && date) {
    json_storage.push(input.value)
    due_date.push(date.value as unknown as Date)
    localStorage.setItem('ls_item', JSON.stringify(json_storage))
    localStorage.setItem('checked', JSON.stringify(checked_box))
    localStorage.setItem('date', JSON.stringify(due_date))
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

if (delete_all && storage) {
  delete_all.addEventListener('click', () => {
    localStorage.clear()
    storage.innerHTML = ''
    json_storage = []
    checked_box = []
    due_date = []
  })
}
