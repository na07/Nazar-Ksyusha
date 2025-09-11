// Вибір елементів DOM та присвоєння їх змінним
let calendarScreen = document.querySelector('.calendar-screen') // Екран календаря
let taskScreen = document.querySelector('.task-screen') // Екран завдань
let addTaskScreen = document.querySelector('.add-task-screen') // Екран додавання завдань
let datePicker = document.querySelector('.date-picker') // Поле вибору дати
let selectDateButton = document.querySelector('.select-date') // Кнопка вибору дати
let selectedDateSpan = document.querySelector('.selected-date') // Елемент для відображення вибраної дати
let taskDateSpan = document.querySelector('.task-date') // Елемент для відображення дати завдання
let taskList = document.querySelector('.task-list') // Список завдань
let addTaskButton = document.querySelector('.add-task') // Кнопка додавання завдання
let backToCalendarButton = document.querySelector('.back-to-calendar') // Кнопка повернення до календаря
let cancelAddTaskButton = document.querySelector('.cancel-add-task') // Кнопка скасування додавання завдання
let taskForm = document.querySelector('.task-form') // Форма додавання завдання
let taskInput = document.querySelector('.task-input') // Поле введення тексту завдання

// Ініціалізація порожнього об'єкта для зберігання завдань
let tasks = {}

function showScreen(name_of_screen) {
   calendarScreen.style.display = 'none'
   taskScreen.style.display = 'none'
   addTaskScreen.style.display = 'none'
   name_of_screen.style.display = 'none'

}

addTaskButton.addEventListener('click', function() {
  showScreen(addTaskScreen)
})

backToCalendarButton.addEventListener('click', function() {
  showScreen(addTaskScreen)
})

cancelAddTaskButton.addEventListener('click', function() {
  showScreen(addTaskScreen)
})

function renderTasks(date) {
    taskList.innerHTML = ''
    if (tasks[date]) {
        tasks[date].forEach(function(task) {
         let li = document.createElement('li')
        li.textContent = task
       
        let deleteBtn = document.createElement('button')
        deleteBtn.textContent = 'Видалити'
        deleteBtn.classList.add('delete')
        li.appendChild(deleteBtn)

        taskList.appendChild(li)

    }) 
 }

}

selectDateButton.addEventListener('click', function(){
  let selectedDate = datePicker.value;
  if (!selectedDate) {
    alert('Оберіть дату')
    return;
  }

  selectedDateSpan.innerHTML = selectedDate
 taskDateSpan.innerHTML = selectedDate
 showScreen(taskScreen)
 renderTasks(selectedDate)

})

taskForm.addEventListener('submit', function(e){
    e.preventDefault()
    let taskText = taskInput.value 
    let selectedDate = taskDateSpan.innerHTML

    if(!taskText) {
      alert('Введіть завдання')
      return
    }
    if(!tasks[selectedDate]) {
        tasks[selectedDate] = []
    }

  tasks[selectedDate].push(taskText)
  taskInput.value = ''
  showScreen(taskScreen)
  renderTasks(selectedDate)

  })



  taskList.addEventListener('click', function (event) {
    if(event.target.className == 'delete') {
    let taskItem = event.target.parentElement
    let selectedDate = taskDateSpan.innerHTML
    let taskText = taskItem.firstChild.nodeValue.trim()


    for (let i = 0; 1 < tasks[selectedDate].lenght; i +=1) {
      if (tasks[selectedDate][i] == taskText) {
          tasks[selectedDate].splice(i, 1)
          break

      }
    }
    renderTasks(selectedDate)
    }

  })