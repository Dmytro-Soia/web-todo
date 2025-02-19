import { type Todo, categories } from '../main'
import { save_items_into_api } from './add-todo-to-api'
import { displayTodo } from './display-todos'

export async function addTodo(
  input: HTMLInputElement,
  date: HTMLInputElement,
  todos: Todo[],
  container: HTMLUListElement,
) {
  if (input && date) {
    const newTodo: Todo = {
      id: '',
      title: input.value,
      content: '',
      due_date: date.value,
      done: false,
    }
    const theNewTodo = await save_items_into_api(
      newTodo.title,
      newTodo.due_date,
      newTodo.done,
    )
    todos.push(theNewTodo)
    displayTodo(todos, container, categories)
  }
}
