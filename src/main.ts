import './style.css'

const input = document.querySelector<HTMLInputElement>("#todo-input")
const button = document.querySelector<HTMLButtonElement>("#add-todo-button")
const storage = document.querySelector<HTMLUListElement>("#todo-storage")


function fn(input: HTMLInputElement): void {
    if (storage) {
        let a = document.createElement("p")
        a.innerText = input.value
        a.classList.add("todo-element")
        storage.append(a)
    }


}

if (button) {
    button.addEventListener("click", () => {
        if (input) {
            fn(input)
        }

    })
}