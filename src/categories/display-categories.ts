import type { Categories } from '../main'
import { get_categories_from_api } from './add-categories-to-api'
import { createCategories } from './create-categories'

export function displayCategories(
  categories: Categories[],
  color: HTMLInputElement,
  storage: HTMLUListElement,
) {
  get_categories_from_api()
  categories.forEach((newCategories, index) => {
    if (storage) {
      createCategories(categories, newCategories, color, index, storage)
    }
  })
}
