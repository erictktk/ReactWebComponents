import seedrandom from "seedrandom";
import { task1, task2, task3, taskArray } from "./fakeTasks";
import { TaskSet } from "./fakeTaskSets";

let rng = seedrandom();

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(rng() * (max - min + 1)) + min;
}

export function GetDateFrom(numDaysAgo) {
  const d = new Date();
  d.setDate(d.getDate() - numDaysAgo);
  return d;
}

/**
 *
 * @param {*} user
 * @param {*} task
 * @param {*} days
 */
export function FakedWorkHistory(user, task, days = 10) {
  /* task
    id: primaryKey(nanoid),
    userID: Number,
    name: String,
    character: Number,
    hitConfirmable: Boolean,
    suggestedTimes: Number,
    notes: String
  */

  /* work
    userID: Number,
    taskID: Number,
    hits: Number,
    attempts: Number,
    date: String
  */

  const startPercent = 0.4;
  const endPercent = 1;

  const successesArr = [];
  const attemptsArr = [];
  const dates = [];

  const workHistory = [];
  for (let i = 0; i < days; i += 1) {
    const curAttempts = task.suggestedTimes;
    const curPercent =
      startPercent + (endPercent - startPercent) * (i / (days - 1));
    let curSuccesses = task.suggestedTimes * curPercent + getRandomInt(-1, 1);
    curSuccesses = Math.round(curSuccesses);
    curSuccesses = Math.min(curAttempts, curSuccesses);
    curSuccesses = Math.max(0, curSuccesses);
    successesArr.push(curSuccesses);
    attemptsArr.push(curAttempts);

    const curDate = GetDateFrom(-(i - days));
    dates.push(curDate);

    const curWork = CreateWork(0, task, curSuccesses, curAttempts, curDate);
    workHistory.push(curWork);
  }

  //return [successesArr, attemptsArr, dates];
  return workHistory;
}

/* TODO how to store date */

/**
 *
 * @param {*} user
 * @param {Task} task
 * @param {Number} successes
 * @param {Number} attempts
 * @param {String} date
 */
export function CreateWork(user = 0, task, successes, attempts, date) {
  /* work
    userID: Number,
    taskID: Number,
    hits: Number,
    attempts: Number,
    date: String
  */
  return {
    userID: user,
    taskID: task.ID,
    hits: successes,
    attempts: attempts,
    date: date
  };
}

export function FakedWork(userID, dbTaskSet, days = 14) {
  /* task
    id: primaryKey(nanoid),
    userID: Number,
    name: String,
    character: Number,
    hitConfirmable: Boolean,
    suggestedTimes: Number,
    notes: String
  */

  /*
  taskSet: {
    id: primaryKey(nanoid),
    userID: String,
    character: Number,
    name: String,
    description: String,
    tasks: manyOf("task"),
    difficulty: Number
  },*/

  /*
  work: {
    id: primaryKey(nanoid),
    userID: Number,
    taskID: Number,
    hits: Number,
    attempts: Number,
    date: String
  },
  */
  
  /*
  workSet: {
    id: primaryKey(nanoid),
    userID: String,
    userName: String,
    workArray: manyOf("work")
  }*/

  const startPercent = 0.4;
  const endPercent = 1;

  const taskArray = dbTaskSet.tasks;

  const workHistory = [];
  for (let i = 0; i < days; i += 1) {
    const multiple =
      startPercent + (endPercent - startPercent) * (i / (days - 1));

    let [cumuSuccesses, cumuAttempts] = [0, 0];

    //per day work
    const curDate = GetDateFrom(days-i);
    const workDay = [];
    for (let j = 0; j < taskArray.length; j += 1) {
      const curTask = taskArray[j];
      const successes = Math.round(curTask.suggestedTimes * multiple);
      const attempts = curTask.suggestedTimes;

      cumuSuccesses += successes;
      cumuAttempts += attempts;

      const curWork = CreateWork(userID, curTask.id, successes, attempts, curDate);
      workDay.push(curWork);
    }

    workHistory.push(workDay)
  }
  return workHistory;
}

/**
 * 
 * @param {Array<Array<Work>>} workHistory 
 */
export function FlattenOutToSet(workHistory){
  const flattened = [];
  for(let i = 0; i < workHistory.length; i += 1){
    for(let j = 0; j < workHistory[i].length; j += 1){
      flattened.push(workHistory[i][j]);
    }
  }

  return flattened;
}
