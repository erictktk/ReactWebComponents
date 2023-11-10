/*export class User{
    constructor(name, lastName, taskSets=[], createdTasks=[]){
        this.firstName: String,
        lastName: String,
        name: String,
        username: String,
        taskSets: Array,
        createdTasks: Array
    }
}*/

export class Task{
    constructor(name, character, hitConfirmable, suggestedTimes, notes){
        this.name = name;
        this.character = character;
        this.hitConfirmable = hitConfirmable;
        this.suggestedTimes = suggestedTimes;
        this.notes = notes;
    }
}