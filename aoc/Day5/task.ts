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
  const data = realData;
  const lookUpTable = data.split("\n\n")[0].split("\n");
  const rows = data.split("\n\n")[1].split("\n");
  let errorRows: string[] = [];
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
    if(error) {
      errorRows.push(row);
    }
  });

  errorRows.forEach((row) => {
    const newRow: string[] = [];

   const options = lookUpTable.map((option) => {
      const temp = option.split("|");
      if(row.includes(temp[0]) && row.includes(temp[1])) {
        return option;
      }
    }).filter((option) => option !== undefined);
    
    const group = groupArray(options);

    while(Object.keys(group).length > 0) {
      let t = "|";

    Object.keys(group).forEach((key) => {
      if(group[key].length === 1) {
        t = group[key][0];
        newRow.unshift(group[key][0]);
        delete group[key];
      }
    });

    const lastDigit = t.split("|")[1];
    Object.keys(group).forEach((key) => {
      group[key] = group[key].filter((option) => option.split('|')[1] !== lastDigit);
      if(group[key].length === 0) {
        delete group[key];
      }
    });
  }
  
  const res = newRow.map((pair, index) => {
    if(index === 0) {
      return pair.replace("|", ",");
    }
    return pair.split("|")[1];
  }).join(",").split(",");

  console.log(res);
  const n = Number(res[Math.round(res.length/2) -1]);
  result += n;
});
console.log(result);
}

const groupArray = (input: string[]): { [key: string]: string[] } => {
  const grouped: { [key: string]: string[] } = {};

  input.forEach(pair => {
    const [first] = pair.split("|");
    if (!grouped[first]) {
      grouped[first] = [];
    }
    grouped[first].push(pair);
  });

  return grouped;
};

