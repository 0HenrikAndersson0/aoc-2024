import { parseArgs } from "jsr:@std/cli/parse-args";
import {} from './logger.ts'
import {
  partOne as DayOnePartOne,
  partTwo as DayOnePartTwo,
} from "./Day1/task.ts";
import {
  partOne as DayTwoPartOne,
  partTwo as DayTwoPartTwo,
} from "./Day2/task.ts";
import {
  partOne as DayThreePartOne,
  partTwo as DayThreePartTwo,
} from "./Day3/task.ts";
import {
  partOne as DayFourPartOne,
  partTwo as DayFourPartTwo,
} from "./Day4/task.ts";
import {
  partOne as DayFivePartOne,
  partTwo as DayFivePartTwo,
} from "./Day5/task.ts";
import {
  partOne as DaySixPartOne,
  partTwo as DaySixPartTwo,
} from "./Day6/task.ts";

const flags = parseArgs(Deno.args, {
  boolean: ["all"],
  string: ["day"],
  default: { all: false },
});


const dayOne = () => {
  console.xmas("**** AOC | Day 1 ****");
  console.log(`Result part one: ${DayOnePartOne()}`);
  console.log(`Result part two: ${DayOnePartTwo()}`);
};

const dayTwo = () => {
  console.xmas("**** AOC | Day 2 ****");
  console.log(`Result part one: ${DayTwoPartOne()}`);
  console.log(`Result part two: ${DayTwoPartTwo()}`);
};

const dayThree = async () => {
  console.xmas("**** AOC | Day 3 ****");
  console.log(`Result part one: ${await DayThreePartOne()}`);
  console.log(`Result part two: ${await DayThreePartTwo()}`);
};

const dayFour = async () => {
  console.xmas("**** AOC | Day 4 ****");
  console.log(`Result part one: ${DayFourPartOne()}`);
  console.log(`Result part two: ${DayFourPartTwo()}`);
};

const dayFive = async () => {
  console.xmas("**** AOC | Day 5 ****");
  console.log(`Result part one: ${DayFivePartOne()}`);
  console.log(`Result part two: ${DayFivePartTwo()}`);
};

const daySix = async () => {
  console.xmas("**** AOC | Day 6 ****");
  console.log(`Result part one: ${DaySixPartOne()}`);
  console.log(`Result part two: ${DaySixPartTwo()}`);
};

if (flags.all) {
  dayOne();
  dayTwo();
  dayThree();
  dayFour();
  dayFive();
  daySix();
} else {
  switch (flags.day) {
    case "1":
      dayOne();
      break;
    case "2":
      dayTwo();
      break;
      case "3":
      await dayThree();
      break;
      case "4":
      await dayFour();
      break;
      case "5":
      await dayFive();
      break;
      case "6":
      await daySix();
      break;
  }
}

