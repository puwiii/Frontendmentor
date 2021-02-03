let todoInput = document.getElementById('todo-input');
let todoList = document.getElementById('todo-list');
let itemsLeft = document.getElementById('items-left');
let darkBtn = document.getElementById('dark-btn');
let container = document.getElementById('container');
let background = document.getElementById('background');
let filters = document.getElementById('filters');
let filtersMobile = document.getElementById('filters-mobile');
let activeFilter = document.querySelector('.all-filter');


document.addEventListener('DOMContentLoaded',getTodos());
todoList.addEventListener('click', deleteCheck);
filters.addEventListener('click', allActiveCompleted);
filtersMobile.addEventListener('click', allActiveCompleted);

activeLinks(activeFilter);

todoInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        
        if(this.value !== ''){

            //creation of item-container
            const itemContainer = document.createElement('div');
            itemContainer.classList.add('container__todo-item-container');
            itemContainer.classList.add('draggable');
            itemContainer.draggable = true;
    
            //creation of circle
            const circle = document.createElement('div');
            circle.classList.add('circle' ,'todo-circle');
            
            //creation of item
            const item = document.createElement('li');
            item.classList.add('container__todo-item');
            item.innerText = this.value;
    
            //creation of remove button
            const removeBtn = document.createElement('button');
            removeBtn.classList.add('remove-btn');

            //setting the childs
            itemContainer.appendChild(circle);
            itemContainer.appendChild(item);
            itemContainer.appendChild(removeBtn);

            //adding to html
            todoList.appendChild(itemContainer);

            //add 1 to items left
            let aux = parseInt(itemsLeft.innerText);
            itemsLeft.innerText = aux+1;

            //
            saveLocalTodos(todoInput.value);

            //clear the input
            this.value = '';

            activeLinks(activeFilter);
            draggables = document.querySelectorAll('.draggable');
            settingListeners();
            console.log(draggables);
        }
        else{
            alert('Really? an empty todo?');
        }
    }
});

darkBtn.addEventListener('click', function(){
    darkBtn.classList.toggle('light-btn');
    background.classList.toggle('dark-mode');
    if(container.classList.toggle('dark-mode')){
        document.body.style.backgroundColor = 'hsl(235, 21%, 11%)';
    }
    else{
        document.body.style.backgroundColor = 'hsl(236, 33%, 92%)';
    }
});

function deleteCheck(e){
    const item = e.target;
    const itemParent = item.parentElement;
    
    //the target is the remove-btn
    if(item.classList[0] === 'remove-btn'){
        //remove todo from local storage
        removeLocalTodos(itemParent.children[1]);
        //removing the container item
        itemParent.classList.add('byebye');
        itemParent.addEventListener('animationend', ()=>{
            itemParent.remove();
            draggables = document.querySelectorAll('.draggable');
        })
        
        //substraction 1 to items left
        let aux = parseInt(itemsLeft.innerText);
        itemsLeft.innerText = aux-1;
    }

    //the target is the complete circle
    if(item.classList[1] === 'todo-circle'){
        //add completed class to item
        itemParent.classList.toggle('completed');
    }
}

function activeLinks(item){
    const todoItems = todoList.childNodes;
    const filterChilds = filters.childNodes;
    const filterSecondChild = filterChilds[3];
    filterSecondChild.childNodes.forEach(function(filter){
        //console.log(filter);
        if(item.classList[1]!=='remove-filter')
        {
            if(filter === item){
                filter.classList.add('selected');
                activeFilter = filter;
            }
            else{
                if(filter.classList.contains('selected')) filter.classList.remove('selected');    
            }
        }
    })

    todoItems.forEach(function(todo){
        switch(item.classList[1]){
            case 'all-filter':
                todo.style.display = 'flex';
                break;

            case 'active-filter':
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }
                else{
                    todo.style.display = 'none';
                }
                break;

            case 'completed-filter':
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }
                else{
                    todo.style.display = 'none';
                }
                break;
            
            case 'remove-filter':
                removeComplete();
                break;
        }
    });   
}

function allActiveCompleted(e){
    const item = e.target;
    activeLinks(item);
}

function removeComplete(){
    const todoItems = todoList.childNodes;
    var items = [];

    todoItems.forEach(function(todo){
        if(todo.classList.contains('completed')){
            removeLocalTodos(todo);
            items.push(todo);
        }
    });  

    let aux = parseInt(itemsLeft.innerText);
    console.log(aux);
    let aux2 = items.length;
    console.log(aux2);
    itemsLeft.innerText = aux - aux2;

    console.log(items);
    items.forEach(function(item){
        item.remove();
    })
    draggables = document.querySelectorAll('.draggable');
}

function saveLocalTodos(todo){
    //check storage
    let todos;
    if(localStorage.getItem('todos')===null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo){
        //creation of item-container
        const itemContainer = document.createElement('div');
        itemContainer.classList.add('container__todo-item-container');
        itemContainer.classList.add('draggable');
        itemContainer.draggable = true;

        //creation of circle
        const circle = document.createElement('div');
        circle.classList.add('circle' ,'todo-circle');
        
        //creation of item
        const item = document.createElement('li');
        item.classList.add('container__todo-item');
        item.innerText = todo;

        //creation of remove button
        const removeBtn = document.createElement('button');
        removeBtn.classList.add('remove-btn');

        //setting the childs
        itemContainer.appendChild(circle);
        itemContainer.appendChild(item);
        itemContainer.appendChild(removeBtn);

        //adding to html
        todoList.appendChild(itemContainer);

        //add 1 to items left
        let aux = parseInt(itemsLeft.innerText);
        itemsLeft.innerText = aux+1;
    })
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

let draggables = document.querySelectorAll('.draggable');
settingListeners();

function settingListeners(){
    draggables.forEach(draggable =>{
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging');
        })

        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');
        })
    });
}


todoList.addEventListener('dragover', e => {
    e.preventDefault();
    const afterElement = getDragAfterElement(todoList, e.clientY);
    const draggable = document.querySelector('.dragging');
    if (afterElement == null){
        todoList.appendChild(draggable);
    }
    else{
        todoList.insertBefore(draggable, afterElement);
    }
})

function getDragAfterElement(container, y){
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];
    
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset){
            return {offset: offset, element: child}
        }
        else{
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}