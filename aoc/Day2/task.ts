import { testData, realData } from "./data.ts";
import { getNumbers, splitDataOnRows } from "../helpers/helpers.ts";

export const partOne = () => {
  let safe = 0;
  const rows = splitDataOnRows(realData);
  rows.forEach((row) => {
    let tempCounter = 0;
    const numbers = getNumbers(row);
    const direction = numbers[0] < numbers[1] ? ">" : "<";
    for (let i = 0; i < numbers.length; i++) {
      if (i == numbers.length - 1) break;
      if (direction === ">") {
        if (numbers[i] < numbers[i + 1]) {
          const temp = numbers[i] - numbers[i + 1];
          if (Math.abs(temp) <= 3) tempCounter++;
        }
      }
      if (direction === "<") {
        if (numbers[i] > numbers[i + 1]) {
          const temp = numbers[i] - numbers[i + 1];
          if (Math.abs(temp) <= 3) tempCounter++;
        }
      }
    }
    if (tempCounter === getNumbers(row).length - 1) safe++;
  });
  return safe;
};

export const partTwo = () => {
  let safe = 0;

  const rows = splitDataOnRows(realData);
  rows.forEach((row) => {
    let tempCounter = 0;
    let skipper = -1;
    let numbers = getNumbers(row);
    let direction = numbers[0] < numbers[1] ? ">" : "<";
    for (let i = 0; i < numbers.length; i++) {
      if (i == numbers.length - 1) {
        if (
          (skipper < getNumbers(row).length - 1) && tempCounter !== numbers.length - 1
        ) {
          numbers = getNumbers(row);
          skipper++;
          i = 0;
          numbers.splice(skipper, 1);
          direction = numbers[0] < numbers[1] ? ">" : "<";
          tempCounter = 0;
        } 
        else break;
      }
      if (direction === ">") {
        if (numbers[i] < numbers[i + 1]) {
          const temp = numbers[i] - numbers[i + 1];
          if (Math.abs(temp) <= 3) tempCounter++;
        }
      }
      if (direction === "<") {
        if (numbers[i] > numbers[i + 1]) {
          const temp = numbers[i] - numbers[i + 1];
          if (Math.abs(temp) <= 3) tempCounter++;
        }
      }
    }
    if (tempCounter === numbers.length - 1) {
      safe++;
    }
  });
  return safe;
};

