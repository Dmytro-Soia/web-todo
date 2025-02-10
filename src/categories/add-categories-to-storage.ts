import type { Categories } from '../main'
import { save_categories_into_api } from './add-categories-to-api'
import { createCategories } from './create-categories'

export function addCategories(
  categoriesInput: HTMLInputElement,
  categoriesColor: HTMLInputElement,
  categories: Categories[],
  categoriesStorage: HTMLUListElement,
) {
  if (categoriesInput) {
    console.log('1e23wef')

    const newIndex = categories.length
    const newCategories: Categories = {
      id: '',
      title: categoriesInput.value,
      color: categoriesColor.value,
    }

    createCategories(
      categories,
      newCategories,
      categoriesColor,
      newIndex,
      categoriesStorage,
    )
    categories.push(newCategories)
    save_categories_into_api(newCategories.title, newCategories.color)
  }
}
