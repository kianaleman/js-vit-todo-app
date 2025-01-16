


/**
 * 
 * @param {String} elementId = Elemento en el cual se renderizara la aplicacion 
 */
export const App = (elementId) => {

    // Cuando la funcion App() se llama
    (() => {
        const app = document.createElement('div');
        app.innerHTML = '<h1>Hola Mundo</h1>';
    })();


}