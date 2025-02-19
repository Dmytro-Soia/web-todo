import type { Categories } from '../main'
import { createCategories } from './create-categories'

export function displayCategories(
  categories: Categories[],
  color: HTMLInputElement,
  storage: HTMLUListElement,
) {
  storage.innerHTML = ''
  categories.forEach((newCategories, index) => {
    if (storage) {
      createCategories(categories, newCategories, color, index, storage)
    }
  })
}
