//### Start of C:\Users\Erik Tkachuk\Documents\_js from documents\Concatenation\src\api\client.js 

// A tiny wrapper around fetch(), borrowed from
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper

export async function client(endpoint, { body, ...customConfig } = {}) {
  const headers = { 'Content-Type': 'application/json' }

  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  let data
  try {
    const response = await window.fetch(endpoint, config)
    data = await response.json()
    if (response.ok) {
      // Return a result object similar to Axios
      return {
        status: response.status,
        data,
        headers: response.headers,
        url: response.url,
      }
    }
    throw new Error(response.statusText)
  } catch (err) {
    return Promise.reject(err.message ? err.message : data)
  }
}

client.get = function (endpoint, customConfig = {}) {
  return client(endpoint, { ...customConfig, method: 'GET' })
}

client.post = function (endpoint, body, customConfig = {}) {
  return client(endpoint, { ...customConfig, body })
}

//### Start of C:\Users\Erik Tkachuk\Documents\_js from documents\Concatenation\src\api\db.js 

import { factory, oneOf, manyOf, primaryKey } from "@mswjs/data";
import { nanoid } from "@reduxjs/toolkit";

export const db = factory({
  user: {
    id: primaryKey(nanoid),
    firstName: String,
    lastName: String,
    name: String,
    username: String,
    taskSets: Array,
    createdTasks: Array
  },
  task: {
    id: primaryKey(nanoid),
    userID: String,
    name: String,
    character: Number,
    hitConfirmable: Boolean,
    suggestedTimes: Number,
    notes: String
  },
  work: {
    id: primaryKey(nanoid),
    userID: Number,
    taskID: Number,
    hits: Number,
    attempts: Number,
    date: String
  },
  taskSet: {
    id: primaryKey(nanoid),
    userID: String,
    character: Number,
    name: String,
    description: String,
    tasks: manyOf("task"),
    difficulty: Number
  },
  workSet: {
    id: primaryKey(nanoid),
    userID: String,
    userName: String,
    workArray: manyOf("work"),
    taskSetID: String
  }
});

//### Start of C:\Users\Erik Tkachuk\Documents\_js from documents\Concatenation\src\api\fakeStuff\fakedUser.js 

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
//### Start of C:\Users\Erik Tkachuk\Documents\_js from documents\Concatenation\src\api\fakeStuff\fakedWork.js 

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

//### Start of C:\Users\Erik Tkachuk\Documents\_js from documents\Concatenation\src\api\fakeStuff\fakeTasks.js 

import { factory, oneOf, manyOf, primaryKey } from "@mswjs/data";

const createTask = (name, character, hitConfirmable, userID = "lala") => {
  return {
    character: character,
    userID: userID,
    name: name,
    hitConfirmable: hitConfirmable,
    suggestedTimes: 7,
    notes: ""
  };
};

export const task0 = createTask("cr.LK cr.LK SA3", 3, true);
export const task1 = createTask("cr.MK SA3", 3, false);
export const task2 = createTask("Jump In HK, cr.MK, HP Shoryu", 3, true);
export const task3 = createTask("MP, HP, LP Shoryu", 3, true);

export const taskArray = [task0, task1, task2, task3];

export const taskQ0 = createTask("HP Command Grab, Ex. Dash, B. HK", 16, true);
export const taskQ1 = createTask("LP Command Grab, HP Slaps", 16, true);
export const taskQ2 = createTask("Jump in HK, cl.MK, (EX) Slaps", 16, true);

export const taskArrayQ = [taskQ0, taskQ1, taskQ2];

export const taskRyu0 = createTask("F. HP, Ex. Shoryu", 9, true);
export const taskRyu1 = createTask("UOH, SA1", 9, false);
export const taskRyu2 = createTask(
  "Jump in HK, cl.HP, EX Donkey Kick, HK Tatsu",
  9,
  true
);

export const taskArrayRyu = [taskRyu0, taskRyu1, taskRyu2];

//### Start of C:\Users\Erik Tkachuk\Documents\_js from documents\Concatenation\src\api\fakeStuff\fakeTaskSets.js 

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

//### Start of C:\Users\Erik Tkachuk\Documents\_js from documents\Concatenation\src\api\handlers.js 

import { rest, setupWorker } from "msw";
import { db } from "./db";

const ARTIFICIAL_DELAY_MS = 1000;

export const handlers = [
  /*
  rest.get("/fakeApi/posts", function (req, res, ctx) {
    const posts = db.post.getAll().map(serializePost);
    return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(posts));
  }),*/
  
  rest.get("/fakeApi/tasks", (req, res, ctx) => {
    const tasks = db.task.getAll();
    return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(tasks));
  }),

  rest.get("/fakeApi/characterTasks/:charID", (req, res, ctx) => {
    const tasks = db.task.getAll({
      where: { charID: { equals: req.params.charID } }
    });
    // return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(serializePost(post)));
    return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(tasks));
  }),

  rest.get("/fakeApi/taskSet", (req, res, ctx) => {
    console.log("taskSets server = ");
    //console.log(taskSets);
    const taskSets = db.taskSet.getAll();
    console.log(taskSets);
    return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(taskSets));
  }),
  rest.get("/fakeApi/randomTaskSet", (req, res, ctx) => {
    const taskSets = db.taskSet.getAll();
    const num = Math.round(Math.random()*(taskSets.length-1));
  }),
  rest.get("/fakeApi/randomTaskSetTasks", (req, res, ctx) => {
    const taskSets = db.taskSet.getAll();
    const num = Math.round(Math.random()*(taskSets.length-1));
    const theTaskSet = taskSets[num];
    console.log(theTaskSet);
    console.log("tasks = " );
    console.log(theTaskSet.tasks);

    return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(theTaskSet));
  }),

  //#region user
  rest.get("fakeApi/userTaskSets/:userID", (req, res, ctx) => {
    
    const user = db.user.findFirst({
      where: { userID: { equals: req.params.userID } }
    })
    const userTaskSets = [];

    for(let i = 0; i < user.taskSets.length; i += 1){
      const curStr = user.taskSets[i];
      const curTaskSet = db.taskSet.findFirst({
        where: { id: { equals: curStr }}
      });
      userTaskSets.push(curTaskSet);
    }

    return(ctx.delay(ARTIFICIAL_DELAY_MS, ctx.json(userTaskSets)))
  }),
  //#endregion

  //#region work
  /*
  rest.get("fakeApi/work/:userID/:", (req, res, ctx) => {
    const tasks = db.task.findMany({
      where: { charID: { equals: req.params.charID } }
    });
    // return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(serializePost(post)));
    return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(tasks));
  }),*/

  //...data is hits, misses etc
  rest.patch("fakeApi/work/:workID/:userID", (req, res, ctx) => {
    const {id, ...data} = req.body;

    const updatedWork = db.work.update({
      where: { id: { equals: req.params.workID }},
      data
    })
    // return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(serializePost(post)));
    return res(
      ctx.delay(ARTIFICIAL_DELAY_MS), 
      ctx.json(updatedWork)
      );
  }),
  //

  /*
  rest.post("/fakeApi/posts", function (req, res, ctx) {
    const data = req.body;

    if (data.content === "error") {
      return res(
        ctx.delay(ARTIFICIAL_DELAY_MS),
        ctx.status(500),
        ctx.json("Server error saving this post!")
      );
    }

    data.date = new Date().toISOString();

    const user = db.user.findFirst({ where: { id: { equals: data.user } } });
    data.user = user;
    data.reactions = db.reaction.create();

    const post = db.post.create(data);
    return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(serializePost(post)));
  }),*/
  rest.get("/fakeApi/task/:taskID", function (req, res, ctx) {
    const task = db.tasks.findFirst({
      where: { id: { equals: req.params.taskID } }
    });
    return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(task));
  }),
  /*
  rest.patch("/fakeApi/posts/:postId", (req, res, ctx) => {
    const { id, ...data } = req.body;
    const updatedPost = db.post.update({
      where: { id: { equals: req.params.postId } },
      data
    });
    return res(
      ctx.delay(ARTIFICIAL_DELAY_MS),
      ctx.json(serializePost(updatedPost))
    );
  }),*/

  /*
  rest.get("/fakeApi/users", (req, res, ctx) => {
    return res(ctx.delay(ARTIFICIAL_DELAY_MS), ctx.json(db.user.getAll()));
  })*/
];

//### Start of C:\Users\Erik Tkachuk\Documents\_js from documents\Concatenation\src\api\server.js 

import { rest, setupWorker } from "msw";
import { factory, oneOf, manyOf, primaryKey } from "@mswjs/data";
import { nanoid } from "@reduxjs/toolkit";
import faker from "faker";
import seedrandom from "seedrandom";
import { Server as MockSocketServer } from "mock-socket";
import { setRandom } from "txtgen";
import { db } from "./db";
import { handlers } from "./handlers";
import { SetupDB } from "./setupDB";

// Add an extra delay to all endpoints, so loading spinners show up.
const ARTIFICIAL_DELAY_MS = 2000;

/* MSW Data Model Setup */

SetupDB();

/* MSW REST API Handlers */
export const worker = setupWorker(...handlers);
// worker.printHandlers() // Optional: nice for debugging to see all available route handlers that will be intercepted

/* Mock Websocket Setup */

const socketServer = new MockSocketServer("ws://localhost");

let currentSocket;

const sendMessage = (socket, obj) => {
  socket.send(JSON.stringify(obj));
};

socketServer.on("connection", (socket) => {
  currentSocket = socket;

  socket.on("message", (data) => {
    const message = JSON.parse(data);

    switch (message.type) {
      case "notifications": {
        const since = message.payload;
        //sendRandomNotifications(socket, since);
        break;
      }
      default:
        break;
    }
  });
});

//### Start of C:\Users\Erik Tkachuk\Documents\_js from documents\Concatenation\src\api\setupDB.js 

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

//### Start of C:\Users\Erik Tkachuk\Documents\_js from documents\Concatenation\src\api\shapes.js 

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