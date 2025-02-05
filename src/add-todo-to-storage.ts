import { input, date, todos } from './main'
import { createTodo } from './create-todo'
import { save_items_into_ls } from './add-todo-to-ls'
import type { Todo } from './main'

export function addTodo() {
  if (input && date) {
    const newIndex = todos.length
    const newTodo: Todo = {
      text: input.value,
      checked_box: false,
      due_date: date.value,
    }
    createTodo(newTodo, newIndex)
    todos.push(newTodo)
    save_items_into_ls()
  }
}