import { save_items_into_ls } from './add-todo-to-ls'
import { get_items_from_ls } from './add-todo-to-ls'
import { displayTodo } from './display-todos'
import type { Todo } from './main'
import { verifyOverdueTodo } from './verification'

export function createTodo(
  todos: Todo[],
  todo: Todo,
  index: number,
  storage: HTMLUListElement,
) {
  if (storage) {
    const todo_li = document.createElement('li')
    todo_li.innerText = todo.text
    todo_li.classList.add('todo-element')

    const checkbox = document.createElement('INPUT') as HTMLInputElement
    checkbox.setAttribute('type', 'checkbox')
    checkbox.classList.add('checkbox')
    checkbox.checked = todo.checked_box
    checkbox.addEventListener('change', () => {
      todos[index].checked_box = checkbox.checked
      localStorage.setItem('todos', JSON.stringify(todos))
    })

    const deleted_button = document.createElement('button')
    deleted_button.classList.add('deleted-button')

    deleted_button.addEventListener('click', () => {
      get_items_from_ls()
      todos.splice(index, 1)
      todo_li.remove()
      storage.innerHTML = ''
      displayTodo(todos, storage)
      save_items_into_ls(todos)
      verifyOverdueTodo(todos)
    })
    const add_date = document.createElement('li')
    if (todo.due_date) {
      add_date.innerText = todo.due_date
      add_date.classList.add(getDateColor(new Date(todo.due_date)))
    } else {
      const no_due_date = document.createElement('p')
      no_due_date.innerText = 'No due date'
      add_date.append(no_due_date)
    }
    todo_li.append(add_date)
    todo_li.append(checkbox)
    todo_li.append(deleted_button)
    storage.append(todo_li)

    console.log(todo.due_date)
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
