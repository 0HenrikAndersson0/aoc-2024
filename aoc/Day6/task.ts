import { realData, testData } from "./data.ts";

export const partOne = () => {
  const data = testData;
  const grid: string[][] = [];
  const visited: string[] = [];
  const pos = { x: 0, y: 0 };
  const up = "^";
  const down = "v";
  const left = "<";
  const right = ">";
  let currentDirection = up;
  const obstruction = "#";

  data.split("\n").forEach((row) => {
    grid.push(row.split(""));
  });

  grid.forEach((row, index) => {
    if (
      row.includes(up) || row.includes(down) || row.includes(left) ||
      row.includes(right)
    ) {
      pos.y = index;
      pos.x = row.indexOf(up) || row.indexOf(down) || row.indexOf(left) ||
        row.indexOf(right);
      currentDirection = row[pos.y, pos.x];
    }
  });

  while (true) {
    if (currentDirection === up) {
      if (pos.y - 1 < 0) {
        break;
      }
      const next = grid[pos.y - 1][pos.x];
      if (next === obstruction) {
        currentDirection = rotate(currentDirection);
      } else {
        pos.y--;
        visited.push(`x:${pos.x}|y:${pos.y}`);
      }
      continue;
    }
    if (currentDirection === down) {
      if (pos.y + 1 > grid.length - 1) {
        break;
      }
      const next = grid[pos.y + 1][pos.x];
      if (next === obstruction) {
        currentDirection = rotate(currentDirection);
      } else {
        pos.y++;
        visited.push(`x:${pos.x}|y:${pos.y}`);
      }
      continue;
    }
    if (currentDirection === left) {
      if (pos.x - 1 < 0) {
        break;
      }
      const next = grid[pos.y][pos.x - 1];
      if (next === obstruction) {
        currentDirection = rotate(currentDirection);
      } else {
        pos.x--;
        visited.push(`x:${pos.x}|y:${pos.y}`);
      }
      continue;
    }
    if (currentDirection === right) {
      if (pos.x + 1 > grid[0].length - 1) {
        break;
      }
      const next = grid[pos.y][pos.x + 1];
      if (next === obstruction) {
        currentDirection = rotate(currentDirection);
      } else {
        pos.x++;
        visited.push(`x:${pos.x}|y:${pos.y}`);
      }
      continue;
    }
  }

  const clean: string[] = [];

  visited.forEach((v) => {
    if (!clean.includes(v)) {
      clean.push(v);
    }
  });

  console.log(clean.length + 1); // Off by one error
};

export const partTwo = () => {
  const data = realData;
  const grid: string[][] = [];
  const pos = { x: 0, y: 0 };
  const initPos = { x: 0, y: 0 };
  const up = "^";
  const down = "v";
  const left = "<";
  const right = ">";
  let currentDirection = up;
  const initDirection = up;
  const obstruction = "#";
  const obstruction2 = "O";
  let loops = 0;
  data.split("\n").forEach((row) => {
    grid.push(row.split(""));
  });

  grid.forEach((row, index) => {
    if (
      row.includes(up) || row.includes(down) || row.includes(left) ||
      row.includes(right)
    ) {
      pos.y = index;
      initPos.y = index;
      pos.x = row.indexOf(up) || row.indexOf(down) || row.indexOf(left) ||
        row.indexOf(right);
      initPos.x = row.indexOf(up) || row.indexOf(down) || row.indexOf(left) ||
        row.indexOf(right);
      currentDirection = row[pos.y, pos.x];
    }
  });

  grid.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell !== obstruction) {
        if ((y === initPos.y && x === initPos.x)) {
          return;
        }
        pos.x = initPos.x;
        pos.y = initPos.y;
        currentDirection = initDirection;
        let steps = 0;
        grid[y][x] = obstruction2;

        while (true) {
          if (steps > 10000) {
            console.log("Loop detected when placing obsticle @ x:", x, "y:", y);
            loops++;
            grid[y][x] = ".";
            break;
          }

          if (currentDirection === up) {
            if (pos.y - 1 < 0) {
              grid[y][x] = ".";
              break;
            }
            const next = grid[pos.y - 1][pos.x];
            if (next === obstruction || next === obstruction2) {
              currentDirection = rotate(currentDirection);
            } else {
              pos.y--;
              steps++;
            }
            continue;
          }
          if (currentDirection === down) {
            if (pos.y + 1 > grid.length - 1) {
              grid[y][x] = ".";
              break;
            }
            const next = grid[pos.y + 1][pos.x];
            if (next === obstruction || next === obstruction2) {
              currentDirection = rotate(currentDirection);
            } else {
              pos.y++;
              steps++;
            }
            continue;
          }
          if (currentDirection === left) {
            if (pos.x - 1 < 0) {
              grid[y][x] = ".";
              break;
            }
            const next = grid[pos.y][pos.x - 1];
            if (next === obstruction || next === obstruction2) {
              currentDirection = rotate(currentDirection);
            } else {
              pos.x--;
              steps++;
            }
            continue;
          }
          if (currentDirection === right) {
            if (pos.x + 1 > grid[0].length - 1) {
              grid[y][x] = ".";
              break;
            }
            const next = grid[pos.y][pos.x + 1];
            if (next === obstruction || next === obstruction2) {
              currentDirection = rotate(currentDirection);
            } else {
              pos.x++;
              steps++;
            }
            continue;
          }
        }
      }
    });
  });
  console.log(loops);
};

const rotate = (dir: string) => {
  switch (dir) {
    case "^":
      return ">";
    case "v":
      return "<";
    case "<":
      return "^";
    case ">":
      return "v";
    default:
      return "up";
  }
};
