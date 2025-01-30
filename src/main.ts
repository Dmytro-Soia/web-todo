import './style.css'

const errorP = document.querySelector('#todo-creation-error')
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

function get_items_from_ls() {
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

get_items_from_ls()

function addTodo() {
  if (input && date) {
    const newIndex = json_storage.length
    displayTodo(input.value, newIndex, false, date.value)
  }
}

function addTodoToStorage() {
  if (input && date) {
    // Before adding to storage, check input length and date validity
    json_storage.push(input.value)
    due_date.push(date.value as unknown as Date)
    localStorage.setItem('ls_item', JSON.stringify(json_storage))
    localStorage.setItem('checked', JSON.stringify(checked_box))
    localStorage.setItem('date', JSON.stringify(due_date))
  }
}

function verifyTodoValidation() {
  if (input && errorP && button && date) {
    const new_date = Date.parse(date.value)
    if (
      input.value.length > 200 ||
      Number.isNaN(new_date) ||
      input.value.trim() === ''
    ) {
      errorP.classList.add('error')
      errorP.innerHTML = 'VALIDATION ERROR'
      button.disabled = true
    } else {
      errorP.classList.remove('error')
      errorP.innerHTML = ''
    }
  }
}

verifyTodoValidation()

if (input && button) {
  input.addEventListener('input', () => {
    if (input.value.trim() === '') {
      button.disabled = true
      verifyTodoValidation()
    } else {
      button.disabled = false
      verifyTodoValidation()
    }
  })
}

if (date && button) {
  date.addEventListener('input', () => {
    if (date.value.trim() === '') {
      button.disabled = true
      verifyTodoValidation()
    } else {
      button.disabled = false
      verifyTodoValidation()
    }
  })
}

if (button) {
  button.addEventListener('click', () => {
    if (input) {
      verifyTodoValidation()
      addTodo()
      addTodoToStorage()
    }
  })
}

function checkEnter(e: KeyboardEvent) {
  if (e.key === 'Enter' && button) {
    if (button.disabled === false) {
      verifyTodoValidation()
      addTodo()
      addTodoToStorage()
    } else {
      e.preventDefault()
      button.disabled = true
    }
  }
}

if (input) {
  input.addEventListener('keydown', checkEnter)
}

if (date) {
  date.addEventListener('keydown', checkEnter)
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
