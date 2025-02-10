import './style.css'
import {
  delete_all_items_from_api,
  get_items_from_api,
} from './add-todo-to-api'
import { addTodo } from './add-todo-to-storage'
import { displayTodo } from './display-todos'
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
  id: string
  title: string
  content: string
  due_date: string
  done: boolean
}

export let todos: Todo[] = await get_items_from_api()
console.log(await get_items_from_api())

if (storage) {
  displayTodo(todos, storage)
}

verifyOverdueTodo(todos)

if (input && button && date) {
  verifyTodoValidation(input, button, date)
}
if (input && button) {
  input.addEventListener('input', () => {
    if (input.value.trim() === '') {
      if (input && button && date) {
        button.disabled = true
        verifyTodoValidation(input, button, date)
      }
    } else {
      if (input && button && date) {
        button.disabled = false
        verifyTodoValidation(input, button, date)
      }
      verifyOverdueTodo(todos)
    }
  })
}

if (date && button) {
  date.addEventListener('input', () => {
    if (date.value.trim() === '') {
      if (input && button && date) {
        button.disabled = true
        verifyTodoValidation(input, button, date)
      } else {
        if (input && button && date) {
          button.disabled = false
          verifyTodoValidation(input, button, date)
        }
        verifyOverdueTodo(todos)
      }
    }
  })
}

if (button) {
  button.addEventListener('click', () => {
    if (input && date && storage) {
      verifyTodoValidation(input, button, date)
      verifyOverdueTodo(todos)
      addTodo(input, date, todos, storage)
    }
  })
}

function checkEnter(e: KeyboardEvent) {
  if (e.key === 'Enter' && button) {
    if (button.disabled === false) {
      if (input && date && storage) {
        verifyTodoValidation(input, button, date)
        verifyOverdueTodo(todos)
        addTodo(input, date, todos, storage)
      }
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
    delete_all_items_from_api()
    storage.innerHTML = ''
    todos = []
    errorOverdue.classList.remove('error-overdue')
    errorOverdue.innerHTML = ''
  })
}
