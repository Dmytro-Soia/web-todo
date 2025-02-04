import { json_storage, checked_box, due_date } from "./main"
import { verifyOverdueTodo } from "./verification"

export function save_items_into_ls() {
  localStorage.setItem('ls_item', JSON.stringify(json_storage))
  localStorage.setItem('checked', JSON.stringify(checked_box))
  localStorage.setItem('date', JSON.stringify(due_date))
  verifyOverdueTodo()
}