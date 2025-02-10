import { type Categories, categoriesColor } from '../main'
import { delete_categories_from_api } from './add-categories-to-api'
import { displayCategories } from './display-categories'

export function createCategories(
  categories: Categories[],
  newCategories: Categories,
  color: HTMLInputElement,
  index: number,
  categoriesStorage: HTMLUListElement,
) {
  if (categoriesStorage && categoriesColor) {
    const categories_li = document.createElement('li')
    categories_li.innerText = newCategories.title
    categories_li.classList.add('categories-element')

    const deleted_button = document.createElement('button')
    deleted_button.classList.add('delete_categories_button')

    deleted_button.addEventListener('click', () => {
      delete_categories_from_api(categories, index)
      categories.splice(index, 1)
      categories_li.remove()
      categoriesStorage.innerHTML = ''
      displayCategories(categories, color, categoriesStorage)
    })

    categories_li.style.backgroundColor = newCategories.color

    categories_li.append(deleted_button)
    categoriesStorage.append(categories_li)
  }
}
