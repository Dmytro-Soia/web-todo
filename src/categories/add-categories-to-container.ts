import { type Categories, categories } from '../main'
import { save_categories_into_api } from './add-categories-to-api'
import { displayCategories } from './display-categories'
export async function addCategories(
  categoriesInput: HTMLInputElement,
  categoriesColor: HTMLInputElement,
  categoriesStorage: HTMLUListElement,
) {
  if (categoriesInput && categoriesStorage) {
    const newCategories: Categories = {
      id: '',
      title: categoriesInput.value,
      color: categoriesColor.value,
    }
    const theNewCategory = await save_categories_into_api(
      newCategories.title,
      newCategories.color,
    )
    categories.push(theNewCategory)
    displayCategories(categories, categoriesColor, categoriesStorage)
  }
}
