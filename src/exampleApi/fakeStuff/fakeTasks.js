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
