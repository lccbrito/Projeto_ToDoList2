function change() {
    const day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Octuber", "November", "December"]

    const data = new Date()
    const hora = data.getHours()
    const msg = document.getElementById('msg')

    msg.innerHTML = `${day[data.getDay()]}, ${data.getDate()} ${month[data.getMonth()]}, ${data.getFullYear()}`

    if (hora >= 5 && hora < 12) {
        document.documentElement.style.setProperty("--imgAtual", 'url(imgs/manhã.jpg')
        document.documentElement.style.setProperty("--corAtual", '#FFCF50')
        document.documentElement.style.setProperty("--corDone", '#e8c669')
    } else if (hora >= 12 && hora < 18) {
        document.documentElement.style.setProperty("--imgAtual", 'url(imgs/tarde.jpg')
        document.documentElement.style.setProperty("--corAtual", '#faa462')
        document.documentElement.style.setProperty("--corDone", '#FEBF90')
    } else {
        document.documentElement.style.setProperty("--imgAtual", 'url(imgs/noite.jpg')
        document.documentElement.style.setProperty("--corAtual", '#0c3675')
        document.documentElement.style.setProperty("--corDone", '#2d4568')
    }   
}

const todoForm = document.querySelector('#form')
const addInput = document.querySelector('#add-input')
const taskList = document.querySelector('#task-list')
const editForm = document.querySelector('#edit-form')
const editInput = document.querySelector('#edit-input')
const cancelBtn = document.querySelector('#cancel-btn')

let previousText

const saveTask = (inputText) => {
    const task = document.createElement("div")
    task.classList.add("task")

    const taskTitle = document.createElement("h3")
    taskTitle.innerText = inputText
    task.appendChild(taskTitle)

    const doneBtn = document.createElement("button")
    doneBtn.classList.add("finish-task")
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>'
    task.appendChild(doneBtn)

    const editBtn = document.createElement("button")
    editBtn.classList.add("edit-task")
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>'
    task.appendChild(editBtn)

    const removeBtn = document.createElement("button")
    removeBtn.classList.add("remove-task")
    removeBtn.innerHTML = '<i class="fa-solid fa-trash"></i>'
    task.appendChild(removeBtn)
    
    taskList.appendChild(task)
    addInput.value = ""
    addInput.focus()
}

const toggleForms = () => {
    editForm.classList.toggle('hide')
    todoForm.classList.toggle('hide') 
    taskList.classList.toggle('hide')
}

const updateTask = (inputText) => {
    const alls = document.querySelectorAll('.task')
    
    alls.forEach((task) => {
        let taskTitle = task.querySelector('h3')

        if (taskTitle.innerText === previousText) {
            taskTitle.innerText = inputText
        }
    })
}

document.addEventListener('click', (event) => {
    const targetElement = event.target
    const parentElement = targetElement.closest('div')
    let taskTitle

    if (parentElement && parentElement.querySelector('h3')) {
        taskTitle = parentElement.querySelector('h3').innerText || ""
    }
    
    if (targetElement.classList.contains('finish-task')) {
        parentElement.classList.toggle('done')
    }
    
    if (targetElement.classList.contains('remove-task')) {
        parentElement.remove()
    }

    if (targetElement.classList.contains('edit-task')) {
        toggleForms()
        
        editInput.value = taskTitle
        previousText = taskTitle 
    }
})

todoForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const inputValue = addInput.value

    if (inputValue) {
        saveTask(inputValue)
    }
})

cancelBtn.addEventListener('click', (event) => {
    event.preventDefault()
    toggleForms()
})

editForm.addEventListener('submit', (event) => {
    event.preventDefault()
    
    const editTextValue = editInput.value
    
    if (editTextValue) {
        updateTask(editTextValue)
    }
    toggleForms()
})

change()