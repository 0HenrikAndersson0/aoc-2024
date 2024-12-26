import { realData, testData } from "./data.ts";

export const partOne = () => {
  const data = realData;
  const lookUpTable = data.split("\n\n")[0].split("\n");
  const rows = data.split("\n\n")[1].split("\n");
  let correctRows: string[] = [];
  let result = 0;
  rows.forEach((row) => {
    const temp = row.split(",");
    let error = false;
    for (let i = 0; i < temp.length - 1; i++) {
      const check = `${temp[i]}|${temp[i + 1]}`;
      if (!lookUpTable.includes(check)) {
        error = true;
        break;
      }
    }
    if(!error) {
      correctRows.push(row);
    }
  });
  correctRows.forEach((row) => {
    const x = row.split(",");
    const n = Number(x[Math.round(x.length/2) -1]);
    result += n;
  });
  console.log(result);
};

export const partTwo = () => {
};

partOne();
