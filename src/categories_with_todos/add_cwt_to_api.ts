export async function get_cwt_from_api() {
  const fetchTodoCwt = await fetch(
    'https://api.todos.in.jt-lab.ch:443/categories_todos',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Prefer: 'return=representation',
      },
    },
  )
  return await fetchTodoCwt.json()
}

export async function add_cwt_into_api(category_id: string, todo_id: string) {
  const qwe = await fetch('https://api.todos.in.jt-lab.ch/categories_todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      category_id: category_id,
      todo_id: todo_id,
    }),
  })
  return await qwe.json()
}

export async function changeCategoryForTodos(
  category_id: string,
  todo_id: string,
): Promise<void> {
  try {
    const response = await fetch(
      'https://api.todos.in.jt-lab.ch/categories_todos',
    )
    const categoriesTodos = await response.json()
    const existingRelation = categoriesTodos.find(
      (item: { category_id: string; todo_id: string }) =>
        item.todo_id === todo_id,
    )

    if (existingRelation) {
      await fetch(
        `https://api.todos.in.jt-lab.ch/categories_todos?todo_id=eq.${existingRelation.todo_id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      await fetch('https://api.todos.in.jt-lab.ch/categories_todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category_id: category_id,
          todo_id: todo_id,
        }),
      })
    } else {
      await fetch('https://api.todos.in.jt-lab.ch/categories_todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          category_id: category_id,
          todo_id: todo_id,
        }),
      })
    }
  } catch (error) {
    console.error(
      'An error occurred while updating categories for the todo:',
      error,
    )
  }
}
