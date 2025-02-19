import {
  changeCategoryForTodos,
  get_cwt_from_api,
} from '../categories_with_todos/add_cwt_to_api'
import type { Categories, Todo } from '../main'
import { verifyOverdueTodo } from '../verification'
import { delete_items_from_api, patch_items_from_api } from './add-todo-to-api'
import { displayTodo } from './display-todos'

export async function createTodo(
  categories: Categories[],
  todos: Todo[],
  newTodo: Todo,
  index: number,
  container: HTMLUListElement,
  errorOverdue: HTMLParagraphElement,
) {
  if (container) {
    const todo_li = document.createElement('li')
    todo_li.innerText = newTodo.title
    todo_li.classList.add('todo-element')

    const select = document.createElement('select')
    const chooseCategorie = document.createElement('option')
    chooseCategorie.value = 'initial value'
    chooseCategorie.innerHTML = '--Choose Categorie--'

    select.appendChild(chooseCategorie)
    for (let i = 0; i < categories.length; i++) {
      const option = document.createElement('option')
      option.value = categories[i].id
      option.innerHTML = categories[i].title
      select.appendChild(option)
    }

    select.addEventListener('change', async () => {
      changeCategoryForTodos(select.value, newTodo.id)
    })

    const qwe = await get_cwt_from_api()
    for (let i = 0; i < qwe.length; i++) {
      if (qwe[i].todo_id === newTodo.id) {
        select.value = qwe[i].category_id
      }
    }

    const checkbox = document.createElement('INPUT') as HTMLInputElement
    checkbox.setAttribute('type', 'checkbox')
    checkbox.classList.add('checkbox')
    checkbox.checked = newTodo.done
    checkbox.addEventListener('change', async () => {
      todos[index].done = checkbox.checked
      patch_items_from_api(todos, index, checkbox.checked)
    })
    const deleted_button = document.createElement('button')
    deleted_button.classList.add('deleted-button')

    deleted_button.addEventListener('click', () => {
      delete_items_from_api(todos, index)
      todos.splice(index, 1)
      todo_li.remove()
      displayTodo(todos, container, categories)
      verifyOverdueTodo(todos, errorOverdue, container)
    })

    const add_date = document.createElement('li')
    add_date.classList.add('no_due_date_error')
    if (newTodo.due_date) {
      add_date.innerText = newTodo.due_date
      add_date.classList.add(getDateColor(new Date(newTodo.due_date)))
    } else {
      const no_due_date = document.createElement('p')
      no_due_date.innerText = 'No due date'
      add_date.append(no_due_date)
    }

    todo_li.append(add_date)
    todo_li.append(select)
    todo_li.append(checkbox)
    todo_li.append(deleted_button)
    container.append(todo_li)
  }
}

export const getDateColor = (date: Date): string => {
  const currentDate = new Date()
  currentDate.setHours(1, 0, 0, 0)
  const fourDaysInMillis = 4 * 24 * 60 * 60 * 1000
  if (date < currentDate) {
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
