import './style.css'
import { addTodo } from './add-todo-to-storage'
import { displayTodo } from './create-todo'
import { verifyOverdueTodo, verifyTodoValidation } from './verification'

export const errorValidation = document.querySelector<HTMLParagraphElement>(
  '#todo-creation-error',
)
export const input = document.querySelector<HTMLInputElement>('#todo-input')
export const button =
  document.querySelector<HTMLButtonElement>('#add-todo-button')
export const storage = document.querySelector<HTMLUListElement>('#todo-storage')
export const errorOverdue =
  document.querySelector<HTMLParagraphElement>('#overdue-error')
export const delete_all =
  document.querySelector<HTMLButtonElement>('#delete-all')
export const date = document.querySelector<HTMLInputElement>('#todo-date')

export interface Todo {
  text: string
  checked_box: boolean
  due_date: string
}

export let todos: Todo[] = []

export function get_items_from_ls() {
  todos = JSON.parse(localStorage.getItem('todos') || '[]')
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
    }
  })
}

function checkEnter(e: KeyboardEvent) {
  if (e.key === 'Enter' && button) {
    if (button.disabled === false) {
      verifyTodoValidation()
      verifyOverdueTodo()
      addTodo()
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
    todos = []
    errorOverdue.classList.remove('error-overdue')
    errorOverdue.innerHTML = ''
  })
}
