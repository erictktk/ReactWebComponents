/*user: {
    id: primaryKey(nanoid),
    firstName: String,
    lastName: String,
    name: String,
    username: String,
    taskSets: manyOf(String),
    createdTasks: manyOf(String)
  },
*/

export const userNames = ["astronout66", "pandaGuy", "opperson", "alexB", "cattaetaGreg"]

export function createUser(userName, taskSetIDs){
    return {
        firstName: "",
        lastName: "",
        taskSets: taskSetIDs,
        name: userName,
        createdTasks: ""
    }
}