import type { Todo } from './main'

export function verifyTodoValidation(
  input: HTMLInputElement,
  button: HTMLButtonElement,
  date: HTMLInputElement,
  errorValidation: HTMLParagraphElement,
) {
  if (input && errorValidation && button && date) {
    const new_date = Date.parse(date.value)
    if (
      input.value.length > 200 ||
      Number.isNaN(new_date) ||
      input.value.trim() === ''
    ) {
      errorValidation.classList.add('error-validation')
      errorValidation.innerHTML = 'VALIDATION ERROR'
      button.disabled = true
    } else {
      errorValidation.classList.remove('error-validation')
      errorValidation.innerHTML = ''
      return true
    }
  }
}

export function verifyOverdueTodo(
  todos: Todo[],
  errorOverdue: HTMLParagraphElement,
  container: HTMLUListElement,
) {
  const currentDate = new Date().toISOString().split('T')[0]
  if (errorOverdue && container) {
    errorOverdue.classList.remove('error-overdue')
    errorOverdue.innerHTML = ''
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].due_date < currentDate) {
        errorOverdue.classList.add('error-overdue')
        errorOverdue.innerHTML = 'YOU HAVE OVERDUE TODO'
      }
    }
  }
}
