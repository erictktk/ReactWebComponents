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
