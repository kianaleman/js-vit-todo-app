import todoStore, { Filters } from '../store/todo.store';
import html from './app.html?raw'
import { renderTodos, renderPending } from './use-cases';


const ElementIDs = {
    ClearCompletedButton: '.clear-completed',
    TodoList: '.todo-list',
    TodoFilters: '.filtro',
    NewTodoInput: '#new-todo-input',
    PendingCountLabel: '#pending-count',
}

/**
 * 
 * @param {String} elementId = Elemento en el cual se renderizara la aplicacion 
 */
export const App = (elementId) => {

    const displayTodos = () => {
        const todos = todoStore.getTodos( todoStore.getCurrentFilter() );
        renderTodos( ElementIDs.TodoList, todos );
        updatePendingCount();
    }


    const updatePendingCount = () => {
        renderPending( ElementIDs.PendingCountLabel );
    }

    // Cuando la funcion App() se llama
    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodos();
    })();


    // Referencias HTML

    const newDescriptionInput = document.querySelector( ElementIDs.NewTodoInput );
    const todoListUL = document.querySelector( ElementIDs.TodoList );
    const clearCompletedButton = document.querySelector( ElementIDs.ClearCompletedButton );
    const FiltersLIs = document.querySelectorAll( ElementIDs.TodoFilters );


    // Listeners
    newDescriptionInput.addEventListener('keyup', ( event ) => {
        // console.log(event);
        // console.log(event.target.value);

        if( event.keyCode !== 13) return;
        if( event.target.value.trim().length === 0 ) return;

        todoStore.addTodo( event.target.value );
        displayTodos();
        event.target.value = '';
         
    });


    todoListUL.addEventListener('click', ( event ) => {
        const element = event.target.closest('[data-id]');
        let idTodo = element.getAttribute('data-id');

        todoStore.toggleTodo( idTodo );
        displayTodos();
    });

    todoListUL.addEventListener('click', ( event ) => {
        if(!event.target.classList.contains('destroy')) return;
        const element = event.target.closest('[data-id]');
        let idTodo = element.getAttribute('data-id');

        todoStore.deleteTodo( idTodo );
        displayTodos();
    });

    clearCompletedButton.addEventListener('click', () => {
        // const deleteCompleted = event.target.className === 'clear-completed';
        // if( !deleteCompleted ) return;
        todoStore.deleteCompleted();
        displayTodos();
    });

    FiltersLIs.forEach( element =>{
        element.addEventListener( 'click', ( element ) => {
            FiltersLIs.forEach( el => el.classList.remove('selected'));
            element.target.classList.add('selected');
            switch(element.target.text){
                case 'Todos': 
                    todoStore.setFilter( Filters.All );
                break;

                case 'Pendientes':
                    todoStore.setFilter( Filters.Pending );
                break;

                case 'Completados':
                    todoStore.setFilter( Filters.Completed );
                break;
                
            }

            displayTodos();
        } );

        

    });

}