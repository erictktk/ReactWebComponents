import { db } from "./db";
//import { fakedWork }
import {
  taskArray,
  taskArrayRyu,
  taskArrayQ
} from "./fakeStuff/fakeTasks";
import { CreateTaskSet } from "./fakeStuff/fakeTaskSets";
import { CreateWork, FakedWorkHistory } from "./fakeStuff/fakedWork";
import { userNames, createUser } from "./fakeStuff/fakedUser";

//db.task.create(taskArray[i]);

export function SetupDB() {
  const tasksToGet = db.task.getAll();
  console.log("tasksToGet = ");
  console.log(tasksToGet);
  console.log(tasksToGet.map((t) => t.id));

  const taskArrs = [taskArray, taskArrayRyu, taskArrayQ];
  for (let j = 0; j < taskArrs.length; j += 1) {
    const curTaskArr = taskArrs[j];
    for (let i = 0; i < curTaskArr.length; i++) {
      db.task.create(curTaskArr[i]);
    }
  }

  for (let i = 0; i < tasksToGet.length; i += 1) {
    const curTask = tasksToGet[i];
    const workHistory = FakedWorkHistory(0, curTask, 10);
    for (let j = 0; j < workHistory.length; j += 1) {
      db.work.create(workHistory[j]);
    }
  }

  //const ryuTasks = db.task.getAll( {character: 9});
  //where: { charID: { equals: 3 } }
  const ryuTasks = db.task.findMany({
    where: { character: { equals: 9 } }
  });

  const qTasks = db.task.findMany({
    where: { character: { equals: 16 } }
  });

  const kenTasks = db.task.findMany({
    where: { character: { equals: 3 } }
  });



  //#region task sets
  const user = "eric";
  const ryuDesc =
    "an intermediate ryu move list for players getting past the basics.";

  const ryuTaskSet = CreateTaskSet(
    user,
    ryuTasks,
    9,
    "Intermediate Ryu Move List",
    ryuDesc,
  );
  db.taskSet.create(ryuTaskSet);
  

  //export function CreateTaskSet(userID="eric", tasks, character, name, description, difficulty=3)


  const qDesc = "my q practice for things I need to work on...";
  const qTaskSet = CreateTaskSet(user, qTasks, 16, "Q Stuff to work on", qDesc);
  const qTaskSetDB = db.taskSet.create(qTaskSet);

  const kenDesc = "standard for basic kens";
  const kenTaskSet = CreateTaskSet(user, kenTasks, 3, "Ken Stuff", kenDesc);
  const kenTaskSetDB = db.taskSet.create(kenTaskSet);

  const allTaskSets = db.taskSet.getAll();
  console.log(allTaskSets);

  console.log("qDB = ");
  console.log(qTaskSetDB.tasks);


  const user1 = createUser(userNames[0], [kenTaskSetDB.id, qTaskSetDB.id]);

  const user1DB = db.user.create(user1);
  console.log(user1DB);
  //#endregion
  
}
