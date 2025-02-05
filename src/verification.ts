import { input, date, button, todos } from './main'
import { errorOverdue, errorValidation } from './main'

export function verifyTodoValidation() {
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
    }
  }
}

export function verifyOverdueTodo() {
  const currentDate = new Date().toISOString().split('T')[0]
  if (errorOverdue) {
    errorOverdue.classList.remove('error-overdue')
    errorOverdue.innerHTML = ''
    for (let i = 0; i < todos.length; i++) {
      if ((todos[i] as unknown as string) < currentDate) {
        errorOverdue.classList.add('error-overdue')
        errorOverdue.innerHTML = 'YOU HAVE OVERDUE TODO'
      }
    }
  }
}