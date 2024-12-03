import { testData, realData } from "./data.ts";
import { getNumbers, splitDataOnRows, readFromFile } from "../helpers/helpers.ts";

export const partOne = async () => {
    let r = 0;
    let temp = "";
    const regex = /^\(\d+,\d+\)$/;
    const data =  await readFromFile("/home/henrik/source/aoc/aoc/Day3/data.txt")
    for (let i = 0; i < data.length; i++) {
        if(temp == "mul(")
        {
            const test = data.slice(i-1, data.indexOf(')', i)+1)
            if(regex.test(test)) {
                const regex = /^\((\d+),(\d+)\)$/;
                const match = test.match(regex);
                if(match) {
                   r += Number(match[1])*Number(match[2])
                }
                i = data.indexOf(')', i);
            }
            temp = "";
            continue;
        }
        
        const c = data[i];
        if(c == "m" && temp.length == 0)
            temp += c;
        if(data[i-1] == "m" && c == "u" && temp.length == 1)
            temp += c;
        if(data[i-1] == "u" && c == "l" && temp.length == 2)
            temp += c;
        if(data[i-1] == "l" && c == "(" && temp.length == 3)
            temp += c;
        
    }
    
    return r;
}

export const partTwo = async () => { 
    let r = 0;
    let disabled = false;
    let temp = "";
    let temp2 = "";
    const regex = /^\(\d+,\d+\)$/;
    const data =  await readFromFile("/home/henrik/source/aoc/aoc/Day3/data.txt")
    for (let i = 0; i < data.length; i++) {

        if(temp2.length == 4 && temp2 == "do()") {
            disabled = false;
            temp2 = "";
        }
            

        if(temp2.length == 7 && temp2 == "don't()") {
            disabled = true;
            temp2 = "";
        }
            

        if(temp == "mul(")
        {
            const test = data.slice(i-1, data.indexOf(')', i)+1)
            if(regex.test(test)) {
                const regex = /^\((\d+),(\d+)\)$/;
                const match = test.match(regex);
                if(match && !disabled) {
                   r += Number(match[1])*Number(match[2])
                }
                i = data.indexOf(')', i);
            }
            temp = "";
            continue;
        }
        
        const c = data[i];
        if(c == "m" && temp.length == 0)
            temp += c;
        if(data[i-1] == "m" && c == "u" && temp.length == 1)
            temp += c;
        if(data[i-1] == "u" && c == "l" && temp.length == 2)
            temp += c;
        if(data[i-1] == "l" && c == "(" && temp.length == 3)
            temp += c;

        if(c == "d" && temp2.length == 0) 
            temp2 += c; 
        if(data[i-1] == "d" &&c == "o" && temp2.length == 1) 
            temp2 += c; 
        if(data[i-1] == "o" && c == "n" && temp2.length == 2) 
            temp2 += c; 
        if(data[i-1] == "n" && c == "'" && temp2.length == 3) 
            temp2 += c; 
        if(data[i-1] == "'" && c == "t" && temp2.length == 4) 
            temp2 += c;
        if(data[i-1] == "t" && c == "(" && temp2.length == 5) 
            temp2 += c; 
        if(data[i-1] == "(" && c == ")" && temp2.length == 6) 
            temp2 += c; 

        if(c == "d" && temp2.length == 0) 
            temp2 += c; 
        if(data[i-1] == "d" && c == "o" && temp2.length == 1) 
            temp2 += c; 
        if(data[i-1] == "o" && c == "(" && temp2.length == 2) 
            temp2 += c; 
        if(data[i-1] == "(" && c == ")" && temp2.length == 3) 
            temp2 += c; 
        
    }
    return r;
}
