import { get_categories_from_api } from './categories/add-categories-to-api'
import { addCategories } from './categories/add-categories-to-storage'
import { displayCategories } from './categories/display-categories'
import './style.css'
import {
  delete_all_items_from_api,
  get_items_from_api,
} from './todos/add-todo-to-api'
import { addTodo } from './todos/add-todo-to-storage'
import { displayTodo } from './todos/display-todos'
import { verifyOverdueTodo, verifyTodoValidation } from './todos/verification'

export const categoriesInput =
  document.querySelector<HTMLInputElement>('#categories-input')
export const categoriesColor =
  document.querySelector<HTMLInputElement>('#categories-color')
export const categoriesButton = document.querySelector<HTMLButtonElement>(
  '#add-categories-button',
)
export const categoriesStorage = document.querySelector<HTMLUListElement>(
  '#categories-storage',
)

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

export interface Categories {
  id: string
  title: string
  color: string
}

export let todos: Todo[] = await get_items_from_api()

export const categories: Categories[] = await get_categories_from_api()

if (storage) {
  displayTodo(todos, storage)
}

if (categoriesStorage && categoriesColor) {
  displayCategories(categories, categoriesColor, categoriesStorage)
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

if (categoriesButton) {
  categoriesButton.addEventListener('click', () => {
    if (categoriesInput && categoriesColor && categoriesStorage) {
      addCategories(
        categoriesInput,
        categoriesColor,
        categories,
        categoriesStorage,
      )
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

if (input && date) {
  input.addEventListener('keydown', checkEnter)
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
