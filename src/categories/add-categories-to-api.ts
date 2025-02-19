import type { Categories } from '../main'

export async function save_categories_into_api(title: string, color: string) {
  const fetchPostCategories = await fetch(
    'https://api.todos.in.jt-lab.ch/categories?order=id.asc',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/vnd.pgrst.object+json',
        Prefer: 'return=representation',
      },
      body: JSON.stringify({
        title: title,
        color: color,
      }),
    },
  )
  return await fetchPostCategories.json()
}

export async function get_categories_from_api() {
  const fetchGetCategories = await fetch(
    'https://api.todos.in.jt-lab.ch/categories?order=id.asc',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
    },
  )
  const respons = await fetchGetCategories.json()
  return respons
}

export async function delete_categories_from_api(
  categories: Categories[],
  index: number,
) {
  const fetchDeleteCategories = await fetch(
    `https://api.todos.in.jt-lab.ch/categories?id=eq.${categories[index].id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
    },
  )
  return fetchDeleteCategories
}
