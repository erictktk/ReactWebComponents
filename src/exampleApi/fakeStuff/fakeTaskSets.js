/*
taskSet: {
  id: primaryKey(nanoid),
  userID: String,
  character: Number,
  name: String,
  description: String,
  tasks: manyOf("task")
}
*/

export function CreateTaskSet(userID="eric", tasks, character, name, description, difficulty=3) {
  return {
    userID: userID,
    character: character,
    name: name,
    description: description,
    tasks: tasks,
    difficulty: difficulty
  };
}

export class TaskSet {
  constructor(userID = "eric", tasks, character, name, description, difficulty = 3) {
    this.userID = userID;
    this.tasks = tasks;
    this.character = character;
    this.name = name;
    this.description = description;
    this.difficulty = difficulty;
  }
}
