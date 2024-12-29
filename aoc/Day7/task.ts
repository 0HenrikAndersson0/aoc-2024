import { realData, testData } from "./data.ts";
import { grayCodeBit, generateCombinations } from "../helpers/helpers.ts";
import { evaluate } from "npm:mathjs";

const countChar = (str: string, char: string) => {
  return str.split(char).length - 1;
};

const bitToOperator = (bit: string) => {
  return bit === "0" ? "+" : "*";
};

const charToOperator = (char: string) => {
  switch (char) {
    case "A":
      return "+";
    case "B":
      return "*";
    case "C":
      return "||";
      default:
        return "+";
  }
};

function enforceLeftToRight(expression: string) {
  const tokens = expression.split(" ");
  let newExpression = tokens[0];
  for (let i = 1; i < tokens.length; i += 2) {
    const operator = tokens[i];
    const operand = tokens[i + 1];
    newExpression = `(${newExpression} ${operator} ${operand})`;
  }
  return newExpression;
}

function calcLeftToRight(expression: string):number {
  let sum = 0;
  let ln:number|undefined = undefined;
  let rn:number|undefined = undefined;
  let op:string|undefined = undefined;
  let lastWasConcat = false;
  let lastWasOp = false;

  expression.split(" ").forEach((token) => { 
    
    if(token === "+" || token === "*") {
      op = token;
      lastWasOp = true;
      return;
    } 
    else if(token === '||') {
      lastWasConcat = true;
      lastWasOp = false;
      return;
    }
    
    else if(lastWasOp) {
      rn = Number(token);
      lastWasOp = false;
      lastWasConcat = false;
      sum = evaluate(`${ln} ${op} ${rn}`);
      lastWasOp = false;
      lastWasConcat = false;
      ln = sum;
      rn = undefined;
      op = undefined;
      return;
    }

    else if(lastWasConcat) {
      ln = Number(`${ln}${token}`);
      sum = ln;
      lastWasOp = false;
      lastWasConcat = false;
      return;
    }
   
    else if(ln === undefined) {
      ln = Number(token);
      lastWasOp = false;
      lastWasConcat = false;
      return;
    }

  });

  return sum;
}  

export const partOne = () => {
  let result: any[] = [];
  const data = realData;
  const rows = data.split("\n");
  rows.forEach((row) => {
    let foundAnswer = false;
    const sum = row.split(":")[0];
    const values = row.split(" ").filter((value) => !value.includes(":"));
    const valueString = values.join(" ? ");
    const variants = grayCodeBit(countChar(valueString, "?"));
    variants.forEach((x, i) => {
      if (foundAnswer) return;
      let expression = valueString;
      for (let i = 0; i < x.length; i++) {
        expression = expression.replace("?", bitToOperator(x[i] as string));
      }
      const res = evaluate(enforceLeftToRight(expression));
      if (res === Number(sum)) {
        console.log("found it", expression);
        result.push(res);
        foundAnswer = true;
      }
    });
  });
  
  return result.reduce((a, b) => a + b, 0);
};

export const partTwo = () => {
  let result: any[] = [];
  const data = realData;
  const rows = data.split("\n");
  rows.forEach((row) => {
    let foundAnswer = false;
    const sum = row.split(":")[0];
    const values = row.split(" ").filter((value) => !value.includes(":"));
    const valueString = values.join(" ? ");
    const variants = generateCombinations(['A', 'B', 'C'],countChar(valueString, "?"));
    variants.forEach((x, i) => {
      if (foundAnswer) return;
      let expression = valueString;
      for (let i = 0; i < x.length; i++) {
        expression = expression.replace("?", charToOperator(x[i] as string));
      }
      const res = calcLeftToRight(expression);
      if (res === Number(sum)) {
        console.log("found it", expression);
        result.push(res);
        foundAnswer = true;
      }
    });
  });

  return result.reduce((a, b) => a + b, 0);
};


