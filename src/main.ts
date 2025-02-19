import { get_categories_from_api } from './categories/add-categories-to-api'
import { addCategories } from './categories/add-categories-to-container'
import { displayCategories } from './categories/display-categories'
import { get_cwt_from_api } from './categories_with_todos/add_cwt_to_api'
import './style.css'
import {
  delete_all_items_from_api,
  get_items_from_api,
} from './todos/add-todo-to-api'
import { addTodo } from './todos/add-todo-to-container'
import { displayTodo } from './todos/display-todos'
import { verifyOverdueTodo, verifyTodoValidation } from './verification'

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
export const container =
  document.querySelector<HTMLUListElement>('#todo-storage')
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

export interface Categories_with_Todos {
  category_id: string
  todo_id: string
}

export let categories: Categories[] = []
export let todos: Todo[] = []
export let cat_with_todos: Categories_with_Todos[] = [];

(async () => {
categories = await get_categories_from_api()

todos = await get_items_from_api()

cat_with_todos = await get_cwt_from_api()

if (categoriesColor && categoriesStorage) {
  displayCategories(categories, categoriesColor, categoriesStorage)
}

if (container && errorOverdue) {
  displayTodo(todos, container, categories)
  verifyOverdueTodo(todos, errorOverdue, container)
}

if (input && button && date && errorValidation) {
  verifyTodoValidation(input, button, date, errorValidation)
}
if (input && button) {
  input.addEventListener('input', () => {
    if (input.value.trim() === '') {
      if (input && button && date && errorValidation) {
        button.disabled = true
        verifyTodoValidation(input, button, date, errorValidation)
      }
    } else if (errorOverdue && container) {
      if (input && button && date && errorValidation) {
        button.disabled = false
        verifyTodoValidation(input, button, date, errorValidation)
      }
      verifyOverdueTodo(todos, errorOverdue, container)
    }
  })
}

if (date && button) {
  date.addEventListener('input', () => {
    if (errorOverdue && container) {
      if (input && button && date && errorValidation) {
        verifyTodoValidation(input, button, date, errorValidation)
      }
      verifyOverdueTodo(todos, errorOverdue, container)
    }
  })
}

if (button) {
  button.addEventListener('click', async () => {
    if (input && date && container && errorOverdue && errorValidation) {
      const verifying = verifyTodoValidation(
        input,
        button,
        date,
        errorValidation,
      )
      if (verifying === true) {
        await addTodo(input, date, todos, container)
        verifyOverdueTodo(todos, errorOverdue, container)
      }
    }
  })
}

if (categoriesButton) {
  categoriesButton.addEventListener('click', async () => {
    if (categoriesInput && categoriesColor && categoriesStorage && container) {
      await addCategories(categoriesInput, categoriesColor, categoriesStorage)
      displayTodo(todos, container, categories)
    }
  })
}

async function checkEnter(e: KeyboardEvent) {
  if (e.key === 'Enter' && button) {
    if (button.disabled === false) {
      if (input && date && container && errorOverdue && errorValidation) {
        const verifying = verifyTodoValidation(
          input,
          button,
          date,
          errorValidation,
        )
        if (verifying === true) {
          await addTodo(input, date, todos, container)
          verifyOverdueTodo(todos, errorOverdue, container)
        } else {
          e.preventDefault()
          button.disabled = true
        }
      }
    }
  }
}

if (input && date) {
  input.addEventListener('keydown', checkEnter)
  date.addEventListener('keydown', checkEnter)
}

if (delete_all && container && errorOverdue) {
  delete_all.addEventListener('click', () => {
    delete_all_items_from_api()
    container.innerHTML = ''
    todos = []
    errorOverdue.classList.remove('error-overdue')
    errorOverdue.innerHTML = ''
  })
}
})()
