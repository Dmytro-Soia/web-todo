import { input, date, json_storage, due_date } from "./main"
import { createTodo } from "./create-todo"
import { save_items_into_ls } from "./add-todo-to-ls"

export function addTodo() {
  if (input && date) {
    const newIndex = json_storage.length
    createTodo (input.value, newIndex, false, date.value)
  }
}

export function addTodoToStorage() {
  if (input && date) {
    json_storage.push(input.value)
    due_date.push(date.value as unknown as string)
    save_items_into_ls()
  }
}