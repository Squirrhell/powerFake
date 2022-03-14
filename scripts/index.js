const textArea = document.querySelector("textarea");
const input = document.querySelector("input")

document.querySelector("button").addEventListener("click", () => {
    window.api.writeFile(input.value, textArea.value);
})