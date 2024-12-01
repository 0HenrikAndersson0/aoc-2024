import { realData, testData } from "./data.ts";
import {getNumbers, splitDataOnRows} from "../helpers/helpers.ts";

export const partOne = () => {
  let leftCol:number[] = [];
  let rightCol:number[] = [];
  const result:number[] = [];
  const rows = splitDataOnRows(testData);
  rows.forEach(row => {
    const r = getNumbers(row);
    leftCol.push(r[0]);
    rightCol.push(r[1]);
    
  })
  leftCol = leftCol.sort();
  rightCol = rightCol.sort();
  for (let index = 0; index < leftCol.length; index++) {
    result.push(Math.abs(leftCol[index]-rightCol[index]));
  }
  return `${result.reduce((prev = 0, curr) => {
    if(isNaN(curr)) {
      return prev;
    }
    return prev + curr;
  })}`;
};

export const partTwo = () => {
  const leftCol:number[] = [];
  const rightCol:number[] = [];
  const result:number[] = [];
  const rows = splitDataOnRows(realData);
  rows.forEach(row => {
    const r = getNumbers(row);
    leftCol.push(r[0]);
    rightCol.push(r[1]);
  });
  leftCol.map(x => {
    const factor = rightCol.filter(y => y === x) ?? 0;
    result.push(x*factor.length)
  })
  return `${result.reduce((prev = 0, curr) => {
    if(isNaN(curr)) {
      return prev;
    }
    return prev + curr;
  })}`;
}
