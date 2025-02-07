import { get_items_from_ls } from './add-todo-to-ls'
import { createTodo } from './create-todo'
import type { Todo } from './main'

export function displayTodo(todos: Todo[], storage: HTMLUListElement) {
  get_items_from_ls()
  todos.forEach((todo, index) => {
    if (storage) {
      createTodo(todos, todo, index, storage)
    }
  })
}
