'use strict'

let todos = savedTodos()
const DomContent = document.getElementById('todoText')
const FilterInput = document.querySelector('#FilterInput')
let Filters = { 
    SearchText : '',
    hideCompleted : false 
}

RenderTodos(todos, Filters)

FilterInput.addEventListener('input',(e) => {
    Filters.SearchText = e.target.value    
    RenderTodos(todos, Filters)
})

const todoForm = document.getElementById('todoForm')
todoForm.addEventListener('submit', (e) => {
    e.preventDefault()   
    if(!addInput.value == ''){
        todos.push({
            id : uuidv4(),
            desc : e.target.elements.addInput.value,
            status : 'notdone'
        })
        saveTodos(todos)        
        RenderTodos(todos,Filters)
        e.target.elements.addInput.value =''
    }   
    console.log(e)      
})

const HideTodos = document.getElementById("HideTodoCheck")
HideTodos.addEventListener('click', (e) => {
    HideTodos.checked ?
        Filters.hideCompleted = true:
        Filters.hideCompleted = false            
    RenderTodos(todos, Filters)       
})

window.addEventListener('storage', (e) => {    
    if(e.key === 'todos'){        
        todos = JSON.parse(e.newValue) 
        RenderTodos(todos, Filters)
    }       
})