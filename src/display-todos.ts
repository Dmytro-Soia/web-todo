import { get_items_from_api } from './add-todo-to-api'
import { createTodo } from './create-todo'
import type { Todo } from './main'

export function displayTodo(todos: Todo[], storage: HTMLUListElement) {
  get_items_from_api()
  todos.forEach((todo, index) => {
    if (storage) {
      createTodo(todos, todo, index, storage)
    }
  })
}
