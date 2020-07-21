'use strict'

// To get Todos
const savedTodos = () => {
    const todoJSON = localStorage.getItem('todos')
    try{
        return todoJSON ? JSON.parse(todoJSON) : []
    } catch(e){
        return []
    }    
}

// To Save Todos 
const saveTodos = (todos) => localStorage.setItem('todos', JSON.stringify(todos))

// TO remove Todo
const removeTodo = (id) => {    
    const removeTodoIndex = todos.findIndex((todo) => todo.id === id)     
    todos.splice(removeTodoIndex, 1)    
}

//Toggle Checkbox
const ToggleCheckbox =(id, todoCheckBox) => {
    const toggleTodo = todos[todos.findIndex((todo) => todo.id === id)]     
    todoCheckBox.checked ? 
        toggleTodo.status = 'done' :
        toggleTodo.status = 'notdone'

    return toggleTodo
}

//To GetDomElements Todos
const getTodoDom = (todo) => {   
    const TodoEl = document.createElement('div')
    const todoCheckBox = document.createElement('input')
    const todoRemoveButton = document.createElement('button')         
    const newp = document.createElement('span')

    todoCheckBox.setAttribute('type', 'checkbox')    
    todo.status == 'done' ?
        todoCheckBox.checked = true :
        todoCheckBox.checked = false       
    todoCheckBox.addEventListener('change', () => {
        ToggleCheckbox(todo.id, todoCheckBox)
        saveTodos(todos)
        RenderTodos(todos, Filters)                                       
    })
    TodoEl.appendChild(todoCheckBox)
    
    newp.textContent = todo.desc    
    TodoEl.appendChild(newp)
    
    todoRemoveButton.textContent = 'x'
    todoRemoveButton.addEventListener('click', () => {
        removeTodo(todo.id)
        saveTodos(todos)
        RenderTodos(todos,Filters)
    })
    TodoEl.appendChild(todoRemoveButton)
   
    return TodoEl
}

//To Render Todos
const RenderTodos = (todos,Filters) => {    
    const FilteredTodos =  todos.filter((todo) => {
            const SearchFilter = todo.desc.toLowerCase().includes(Filters.SearchText.toLowerCase())
            const HideFilter = Filters.hideCompleted ? todo.status.includes('notdone') : todo 
            return SearchFilter && HideFilter        
        })    

    const IncompleteTodos = FilteredTodos.filter((todo) => { 
        if(todo.status.toLowerCase() == 'notdone')
            return todo
    })
 
    DomContent.innerHTML = ''
    DomContent.appendChild(summaryIncompleteTodo(IncompleteTodos))
        
    FilteredTodos.forEach((todo) => {
        DomContent.appendChild(getTodoDom(todo))
    })       
}

//To Summary incomplete Todo 
const summaryIncompleteTodo = (IncompleteTodos) => {
    const Summary = document.createElement('h3')
    Summary.textContent = `You have ${IncompleteTodos.length} todo(s) incompleted`
    return Summary
}

// const now = new Date()
// console.log(now)

// const timestamp = now.getTime()
// console.log(timestamp)

// const nowOne = moment().set({'year' : 1999, 'month' : 4, 'date' : 20})
// console.log(nowOne.toString())

// const nowOneTimeStamp = nowOne.valueOf()
// console.log(nowOneTimeStamp)

// const fromNow = moment(nowOne).fromNow()
// console.log(fromNow)
