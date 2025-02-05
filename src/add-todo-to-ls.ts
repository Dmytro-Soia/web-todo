import { todos } from './main'
import { verifyOverdueTodo } from './verification'

export function save_items_into_ls() {
  localStorage.setItem('todos', JSON.stringify(todos))
  verifyOverdueTodo()
}
