import { type Categories, type Todo, errorOverdue } from '../main'
import { createTodo } from './create-todo'

export async function displayTodo(
  todos: Todo[],
  container: HTMLUListElement,
  categories: Categories[],
) {
  container.innerHTML = ''
  todos.forEach((todo: Todo, index: number) => {
    if (container && errorOverdue) {
      createTodo(categories, todos, todo, index, container, errorOverdue)
    }
  })
}
