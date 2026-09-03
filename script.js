// Select dom Objects
let input = document.getElementById("todo-input");
let btn = document.getElementById("add-btn");
let list = document.getElementById("todo-list");

//try to load todos from localstorage (if there)
const saved = localStorage.getItem('todos');
const todos = saved ? JSON.parse(saved) : [];

function saveTodos() {
    //save current todos array to local storage
    localStorage.setItem('todos', JSON.stringify(todos));
}

//Create a dom node for todo object and append it to list
function createTodoNode(todo, index) {
    const li = document.createElement('li');

    //checkbox to toggle completion
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = !!todo.completed;
    checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;

        //visual feedback: strike-through when completed
        if (checkbox.checked) {
            textSpan.style.textDecoration = "line-through";
        } else {
            textSpan.style.textDecoration = "none";
        }
        saveTodos();
    }); // <--- Yahan pehle function close ho raha tha, ab bracket neeche shift kar diya hai

    const textSpan = document.createElement("span");
    textSpan.textContent = todo.text;
    textSpan.style.margin = '0 10px';
    if (todo.completed) {
        textSpan.style.textDecoration = "line-through";
    }

    //add a double click event to edit the todo text
    li.addEventListener("dblclick", (event) => {
        if (event.target.closest("button, input")) {
            return;
        }

        const newText = prompt("Edit todo", todo.text);
        if (newText !== null && newText.trim() !== "") {
            todo.text = newText.trim();
            textSpan.textContent = todo.text;
            saveTodos();
        }
    });

    //delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener('click', () => {
        todos.splice(index, 1);
        render();
        saveTodos();
    });

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(deleteBtn);

    return li; // Ab ye return function KE ANDAR hai!
} // <--- Function ab yahan properly close ho raha hai

//render the whole todo list from todos array
function render() {
    list.innerHTML = "";

    // recreate each Element
    todos.forEach((todo, index) => {
        const node = createTodoNode(todo, index);
        list.appendChild(node);
    });
}

function addTodo() {
    const text = input.value.trim();
    if (!text) {
        return;
    }

    //push a new todo object
    todos.push({ text, completed: false });
    input.value = '';
    render();
    saveTodos();
}

btn.addEventListener('click', addTodo);
render();