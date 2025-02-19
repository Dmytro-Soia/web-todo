import type { Todo } from '../main'

export async function save_items_into_api(
  title: string,
  due_date: string,
  done: boolean,
) {
  const fetchPost = await fetch(
    'https://api.todos.in.jt-lab.ch/todos?select=*,categories(*)&order=id.asc',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/vnd.pgrst.object+json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify({
        title: title,
        due_date: due_date,
        done: done,
      }),
    },
  )
  return await fetchPost.json()
}

export async function get_items_from_api() {
  const fetchTodo = await fetch(
    'https://api.todos.in.jt-lab.ch/todos?select=*,categories(*)&order=id.asc',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
    },
  )
  const respons = await fetchTodo.json()
  return respons
}

export async function delete_all_items_from_api() {
  const fetchDeleteAll = await fetch(
    'https://api.todos.in.jt-lab.ch/todos?select=*,categories(*)&order=id.asc',
    {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    },
  )
  return fetchDeleteAll
}

export async function delete_items_from_api(todos: Todo[], index: number) {
  const fetchDelete = await fetch(
    `https://api.todos.in.jt-lab.ch/todos?select=*,categories(*)&id=eq.${todos[index].id}&order=id.asc`,
    {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    },
  )
  return fetchDelete
}

export async function patch_items_from_api(
  todos: Todo[],
  index: number,
  done: boolean,
) {
  const fetchPatch = await fetch(
    `https://api.todos.in.jt-lab.ch/todos?select=*,categories(*)&id=eq.${todos[index].id}&order=id.asc`,
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
  return fetchPatch
}
