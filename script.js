
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

// Функція для відображення певного екрану
function showScreen(name_of_screen) {
    calendarScreen.style.display = 'none' // Приховати екран календаря
    taskScreen.style.display = 'none' // Приховати екран завдань
    addTaskScreen.style.display = 'none' // Приховати екран додавання завдань
    name_of_screen.style.display = 'block' // Показати вибраний екран
}

// Додавання обробника події на кнопку додавання завдання
addTaskButton.addEventListener('click', function () {
    showScreen(addTaskScreen) // Показати екран додавання завдання
})

// Додавання обробника події на кнопку повернення до календаря
backToCalendarButton.addEventListener('click', function () {
    showScreen(calendarScreen) // Показати екран календаря
})

// Додавання обробника події на кнопку скасування додавання завдання
cancelAddTaskButton.addEventListener('click', function () {
    showScreen(taskScreen) // Показати екран завдань
})

// Функція для відображення завдань для певної дати
function renderTasks(date) {
    taskList.innerHTML = '' // Очистити список завдань
    if (tasks[date]) { // Якщо є завдання для вибраної дати, відобразити їх
        tasks[date].forEach(function (task) {
            let li = document.createElement('li') // Створити елемент списку
            li.textContent = task

            let deleteBtn = document.createElement('button') // Створити кнопку видалення
            deleteBtn.textContent = 'Видалити'
            deleteBtn.classList.add('delete')
            li.appendChild(deleteBtn) // Додати кнопку до елементу списку

            taskList.appendChild(li) // Додати елемент списку до DOM
        })
    }
}


// Додавання обробника події на кнопку вибору дати
selectDateButton.addEventListener('click', function () {
    let selectedDate = datePicker.value; // Отримання вибраної дати
    if (!selectedDate) { // Якщо дата не вибрана, показати попередження
        alert('Оберіть дату')
        return;
    }
    selectedDateSpan.innerHTML = selectedDate // Відображення вибраної дати
    taskDateSpan.innerHTML = selectedDate // Встановлення дати завдання
    showScreen(taskScreen) // Показати екран завдань
    renderTasks(selectedDate) // Відобразити завдання для вибраної дати
})

// Додавання обробника події на форму додавання завдання
taskForm.addEventListener('submit', function (e) {
    //За замовчуванням, коли форму відправляють, браузер перезавантажує сторінку, що призводить до втрати всіх даних, які не зберігаються.
    e.preventDefault() // Запобігти стандартній поведінці форми
    let taskText = taskInput.value // Отримання тексту завдання
    let selectedDate = taskDateSpan.innerHTML // Отримання вибраної дати


    if (!tasks[selectedDate]) { // Якщо для вибраної дати немає завдань, створити новий масив
        tasks[selectedDate] = []
    }
    

    tasks[selectedDate].push(taskText) // Додати нове завдання до масиву завдань для вибраної дати
    taskInput.value = '' // Очистити поле введення
    showScreen(taskScreen) // Показати екран завдань
    renderTasks(selectedDate) // Відобразити завдання для вибраної дати
})


// Додавання обробника події на список завдань для видалення завдань
taskList.addEventListener('click', function (event) {
    if (event.target.className == 'delete') { // Якщо клік був на кнопку видалення
        let taskItem = event.target.parentElement // Отримуємо батьківський елемент кнопки "delete".
        let selectedDate = taskDateSpan.innerHTML // Отримати вибрану дату
        let taskText = taskItem.firstChild.nodeValue.trim() // Отримати текст завдання
        // taskItem.firstChild  перший вузол всередині елемента (це текст до кнопки).
        //.nodeValue  сам текст.
        //.trim() прибирає зайві пробіли на початку та в кінці.
        //Таким чином отримуємо рядок типу "Купити молоко".

        // Видалити завдання з масиву завдань для вибраної дати
        for (let i = 0; i < tasks[selectedDate].length; i += 1) {
            if (tasks[selectedDate][i] == taskText) {
                tasks[selectedDate].splice(i, 1) // Видалити завдання з масиву
                break
            }
        }
        renderTasks(selectedDate) // Відобразити оновлений список завдань
    }
})