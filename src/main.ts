import './style.css'
import { verifyOverdueTodo, verifyTodoValidation } from './verification'
import { displayTodo } from './create-todo'
import { addTodo, addTodoToStorage } from './add-todo-to-storage'


export const errorValidation = document.querySelector<HTMLParagraphElement>(
  '#todo-creation-error',
)
export const input = document.querySelector<HTMLInputElement>('#todo-input')
export const button = document.querySelector<HTMLButtonElement>('#add-todo-button')
export const storage = document.querySelector<HTMLUListElement>('#todo-storage')
export const errorOverdue =
  document.querySelector<HTMLParagraphElement>('#overdue-error')
export const delete_all = document.querySelector<HTMLButtonElement>('#delete-all')
export const date = document.querySelector<HTMLInputElement>('#todo-date')
export let json_storage: string[] = []
export let checked_box: boolean[] = []
export let due_date: string[] = []
// create body of todo with input text, index and checkbox


export function get_items_from_ls() {
  json_storage = JSON.parse(localStorage.getItem('ls_item') || '[]')
  checked_box = JSON.parse(localStorage.getItem('checked') || '[]')
  due_date = JSON.parse(localStorage.getItem('date') || '[]')
}

displayTodo()

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

if (delete_all && storage && errorOverdue) {
  delete_all.addEventListener('click', () => {
    localStorage.clear()
    storage.innerHTML = ''
    json_storage = []
    checked_box = []
    due_date = []
    errorOverdue.classList.remove('error-overdue')
    errorOverdue.innerHTML = ''
  })
}
