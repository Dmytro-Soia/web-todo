import './style.css'

const errorP = document.querySelector<HTMLParagraphElement>(
  '#todo-creation-error',
)
const input = document.querySelector<HTMLInputElement>('#todo-input')
const button = document.querySelector<HTMLButtonElement>('#add-todo-button')
const storage = document.querySelector<HTMLUListElement>('#todo-storage')
const errorO = document.querySelector<HTMLParagraphElement>('#overdue-error')
const delete_all = document.querySelector<HTMLButtonElement>('#delete-all')
const date = document.querySelector<HTMLInputElement>('#todo-date')
let json_storage: string[] = []
let checked_box: boolean[] = []
let due_date: string[] = []
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
    deleted_button.classList.add('deleted-button')

    deleted_button.addEventListener('click', () => {
      get_items_from_ls()
      json_storage.splice(index, 1)
      checked_box.splice(index, 1)
      due_date.splice(index, 1)
      save_items_into_ls()
      todo_li.remove()
      storage.innerHTML = ''
      displayTodos()
      verifyOverdueTodo()
    })
    const add_date = document.createElement('li')
    if (data) {
      add_date.innerText = data
      add_date.classList.add(getDateColor(new Date(data)))
    } else {
      const no_due_date = document.createElement('p')
      no_due_date.innerText = 'No due date'
      add_date.append(no_due_date)
    }
    localStorage.setItem('date', JSON.stringify(due_date))
    todo_li.append(add_date)
    todo_li.append(checkbox)
    todo_li.append(deleted_button)
    storage.append(todo_li)
  }
}

const getDateColor = (date: Date): string => {
  const currentDate = new Date()
  currentDate.setHours(1, 0, 0, 0)
  const fourDaysInMillis = 4 * 24 * 60 * 60 * 1000
  if (date < currentDate) {
    if (errorO) {
    }
    return 'red'
  }
  if (date.getTime() === currentDate.getTime()) {
    return 'blue'
  }
  if (
    date.getTime() >
    currentDate.setTime(currentDate.getTime() + fourDaysInMillis)
  ) {
    return 'green'
  }
  return 'orange'
}

function get_items_from_ls() {
  json_storage = JSON.parse(localStorage.getItem('ls_item') || '[]')
  checked_box = JSON.parse(localStorage.getItem('checked') || '[]')
  due_date = JSON.parse(localStorage.getItem('date') || '[]')
}

function save_items_into_ls() {
  localStorage.setItem('ls_item', JSON.stringify(json_storage))
  localStorage.setItem('checked', JSON.stringify(checked_box))
  localStorage.setItem('date', JSON.stringify(due_date))
  verifyOverdueTodo()
}

function displayTodos() {
  get_items_from_ls()
  json_storage.forEach((todoText, index) => {
    displayTodo(
      todoText,
      index,
      checked_box[index],
      due_date[index] as unknown as string,
    )
  })
}

displayTodos()

function addTodo() {
  if (input && date) {
    const newIndex = json_storage.length
    displayTodo(input.value, newIndex, false, date.value)
  }
}

function addTodoToStorage() {
  if (input && date) {
    json_storage.push(input.value)
    due_date.push(date.value as unknown as string)
    save_items_into_ls()
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

function verifyOverdueTodo() {
  const currentDate = new Date().toISOString().split('T')[0]
  if (errorO) {
    errorO.classList.remove('error2')
    errorO.innerHTML = ''
    for (let i = 0; i < due_date.length; i++) {
      if (due_date[i] < currentDate) {
        errorO.classList.add('error2')
        errorO.innerHTML = 'YOU HAVE OVERDUE TODO'
      }
    }
  }
}
verifyOverdueTodo()

verifyTodoValidation()

if (input && button) {
  input.addEventListener('input', () => {
    if (input.value.trim() === '') {
      button.disabled = true
      verifyTodoValidation()
      verifyOverdueTodo()
    } else {
      button.disabled = false
      verifyTodoValidation()
      verifyOverdueTodo()
    }
  })
}

if (date && button) {
  date.addEventListener('input', () => {
    if (date.value.trim() === '') {
      button.disabled = true
      verifyTodoValidation()
      verifyOverdueTodo()
    } else {
      button.disabled = false
      verifyTodoValidation()
      verifyOverdueTodo()
    }
  })
}

if (button) {
  button.addEventListener('click', () => {
    if (input) {
      verifyTodoValidation()
      verifyOverdueTodo()
      addTodo()
      addTodoToStorage()
    }
  })
}

function checkEnter(e: KeyboardEvent) {
  if (e.key === 'Enter' && button) {
    if (button.disabled === false) {
      verifyTodoValidation()
      verifyOverdueTodo()
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

if (delete_all && storage && errorO) {
  delete_all.addEventListener('click', () => {
    localStorage.clear()
    storage.innerHTML = ''
    json_storage = []
    checked_box = []
    due_date = []
    errorO.classList.remove('error2')
    errorO.innerHTML = ''
  })
}
