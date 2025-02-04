import { json_storage, checked_box, due_date, storage, errorOverdue } from "./main"
import { save_items_into_ls } from "./add-todo-to-ls"
import { verifyOverdueTodo } from "./verification"
import { get_items_from_ls } from "./main"

export function createTodo(
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
        if (storage) {
        get_items_from_ls()
        json_storage.splice(index, 1)
        checked_box.splice(index, 1)
        due_date.splice(index, 1)
        save_items_into_ls()
        todo_li.remove()
        storage.innerHTML = ''
        displayTodo()
        verifyOverdueTodo()
        }
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

export const getDateColor = (date: Date): string => {
  const currentDate = new Date()
  currentDate.setHours(1, 0, 0, 0)
  const fourDaysInMillis = 4 * 24 * 60 * 60 * 1000
  if (date < currentDate) {
    if (errorOverdue) {
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

export function displayTodo() {
  get_items_from_ls()
  json_storage.forEach((todoText, index) => {
    createTodo(
      todoText,
      index,
      checked_box[index],
      due_date[index] as unknown as string,
    )
  })
}