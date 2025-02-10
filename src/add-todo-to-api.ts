import type { Todo } from './main'

export async function save_items_into_api(
  title: string,
  due_date: string,
  done: boolean,
) {
  const fetchPost = await fetch('https://api.todos.in.jt-lab.ch/todos', {
    method: 'POST',
    body: JSON.stringify({
      title: title,
      due_date: due_date,
      done: done,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (fetchPost.ok) {
  }
}

export async function get_items_from_api() {
  const fetchTodo = await fetch('https://api.todos.in.jt-lab.ch/todos', {
    method: 'GET',
  })
  const respons = await fetchTodo.json()
  return respons
}

export async function delete_all_items_from_api() {
  const fetchDeleteAll = await fetch('https://api.todos.in.jt-lab.ch/todos', {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
    },
  })
  if (fetchDeleteAll.ok) {
  }
}

export async function delete_items_from_api(todos: Todo[], index: number) {
  const fetchDelete = await fetch(
    `https://api.todos.in.jt-lab.ch/todos?id=eq.${todos[index].id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
      body: null,
    },
  )
  if (fetchDelete.ok) {
  }
}

export async function patch_items_from_api(
  todos: Todo[],
  index: number,
  done: boolean,
) {
  const fetchPatch = await fetch(
    `https://api.todos.in.jt-lab.ch/todos?id=eq.${todos[index].id}&order=id.asc`,
    {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        done: done,
      }),
    },
  )
  if (fetchPatch.ok) {
  }
}
