import { save_items_into_api } from './add-todo-to-api'
import { createTodo } from './create-todo'
import type { Todo } from './main'

export function addTodo(
  input: HTMLInputElement,
  date: HTMLInputElement,
  todos: Todo[],
  storage: HTMLUListElement,
) {
  if (input && date) {
    const newIndex = todos.length
    const newTodo: Todo = {
      id: '',
      title: input.value,
      content: '',
      due_date: date.value,
      done: false,
    }
    createTodo(todos, newTodo, newIndex, storage)
    todos.push(newTodo)
    save_items_into_api(newTodo.title, newTodo.due_date, newTodo.done)
  }
}
