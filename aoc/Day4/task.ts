import { testData, realData } from "./data.ts";

let width = 0;
let height = 0;
let secondCountSet = 0;

export const partOne = () => {
  const data = realData;
  const regex = /(XMAS|SAMX)/g;
  const regex2 = /(XMASAMX|SAMXMAS)/g;
  const matches = data.match(regex);
  const matches2 = data.match(regex2);
  const firstCountSet = matches?.length ?? 0;
  const thirdCounterSet = matches2?.length ?? 0;
  const rows = data.split("\n");
  const xSize = (width = rows[0].length);
  const ySize = (height = rows.length);
  const grid: string[][] = [];

  for (let y = 0; y < ySize; y++) {
    grid.push([]);
    for (let x = 0; x < xSize; x++) {
      grid[y][x] = rows[y][x];
    }
  }
  traverseDiag(grid, 0, 0);
  traverseDownAndUp(grid, 0, 0);
  console.log(firstCountSet + secondCountSet + thirdCounterSet);
};

const traverseDiag = (grid: string[][], xPos: number, yPos: number) => {
  for (let y = yPos; y < height; y++) {
    for (let x = xPos; x < width; x++) {
      const c = grid[y][x];
      if (c == "X") {
        if (x + 3 < width && y + 3 < height) {
          const m = grid[y + 1][x + 1];
          const a = grid[y + 2][x + 2];
          const s = grid[y + 3][x + 3];
          if (m == "M" && a == "A" && s == "S") {
            secondCountSet++;
          }
        }
      }
      if (c == "X") {
        if (x - 3 >= 0 && y + 3 < height) {
          const m = grid[y + 1][x - 1];
          const a = grid[y + 2][x - 2];
          const s = grid[y + 3][x - 3];
          if (m == "M" && a == "A" && s == "S") {
            secondCountSet++;
          }
        }
      }
      if (c == "S") {
        if (x + 3 < width && y + 3 < height) {
          const a = grid[y + 1][x + 1];
          const m = grid[y + 2][x + 2];
          const x1 = grid[y + 3][x + 3];
          if (x1 == "X" && m == "M" && a == "A") {
            secondCountSet++;
          }
        }
      }
      if (c == "S") {
        if (x - 3 >= 0 && y + 3 < height) {
          const a = grid[y + 1][x - 1];
          const m = grid[y + 2][x - 2];
          const x1 = grid[y + 3][x - 3];
          if (x1 == "X" && m == "M" && a == "A") {
            secondCountSet++;
          }
        }
      }
    }
  }
};

const traverseDownAndUp = (grid: string[][], xPos: number, yPos: number) => {
    for (let y = yPos; y < height; y++) {
        for (let x = xPos; x < width; x++) {
          const c = grid[y][x];
          if (c == "X") {
            if (y + 3 < height) {
              const m = grid[y + 1][x];
              const a = grid[y + 2][x];
              const s = grid[y + 3][x];
              if (m == "M" && a == "A" && s == "S") {
                secondCountSet++;
              }
            }
          }
          if (c == "S") {
            if (y + 3 < height) {
              const a = grid[y + 1][x];
              const m = grid[y + 2][x];
              const x1 = grid[y + 3][x];
              if (a == "A" && m == "M" && x1 == "X") {
                secondCountSet++;
              }
            }
          }
        }
    }
}

export const partTwo = () => {
    // Todo

    
};

partOne();
