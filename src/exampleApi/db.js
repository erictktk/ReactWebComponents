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
