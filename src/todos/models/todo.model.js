
import { v4 as uuid } from 'uuid';

export class Todo {

    /**
     * 
     * @param {String} description : recibe la descripcion de la tarea
     */
    constructor( description ){
        
        this.id = uuid();
        this.description = description;
        this.done = false;
        this.createAt = new Date();
    }
}