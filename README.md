# streak-counter

a streak counter for the browser, inspired by Duolingo

this is streak counter - inspired by duolingo - written in typescript and mean for the browser (uses 'localStorage').

##Install

```shell

yarn add @imshaz/streak-counter

```

step 1 npm install @imshaz/streak-counter

step 2 import {streakCounter} from '@imshaz/streak-counter'

step 3
const today = new Date()
const streak = streakCounter(localStorage, today)

// streak returns an object:
// {
// currentCount: 1,
// lastLoginDate: "1/1/2022",
// startDate: "1/10/2022",
// }
