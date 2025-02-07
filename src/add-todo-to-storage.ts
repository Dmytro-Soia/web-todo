import { save_items_into_ls } from './add-todo-to-ls'
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
      text: input.value,
      checked_box: false,
      due_date: date.value,
    }
    createTodo(todos, newTodo, newIndex, storage)
    todos.push(newTodo)
    save_items_into_ls(todos)
  }
}
