import type { Todo } from './main'
import { verifyOverdueTodo } from './verification'

export function save_items_into_ls(todos: Todo[]) {
  localStorage.setItem('todos', JSON.stringify(todos))
  verifyOverdueTodo(todos)
  console.log(todos)
}

export function get_items_from_ls() {
  return JSON.parse(localStorage.getItem('todos') || '[]')
}
