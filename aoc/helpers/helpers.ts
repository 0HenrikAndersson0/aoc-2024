export const getNumbers = (text: string): number[] => {
  const data = text.match(/\d+/g)?.map(Number);
  if(data)
    return data
  return [];
};

export const splitOn = (text:string, splitter: string): string[] => {
    return text.split(splitter);
};

export const splitDataOnRows = (text:string):string[] => {
  return text.split(/\r?\n|\r|\n/g);
}

export const readFromFile = async (path:string) => {
  const text = await Deno.readTextFile(path);
  return text;
}

export const grayCodeBit = (n:number) => { 
  const resultCode = []; 
  for (let i = 0; i < 1 << n; i++) { 
      resultCode.push(i ^ (i >> 1)); 
  } 
  return resultCode.map((code) => 
      code.toString(2).padStart(n, '0')); 
} 

export const generateCombinations = (characters: string[], n: number): string[] => {
  if (n === 1) {
    return characters;
  }
  const smallerCombinations = generateCombinations(characters, n - 1);
  const combinations = [];
  for (const smaller of smallerCombinations) {
    for (const char of characters) {
      combinations.push(smaller + char);
    }
  }
  return combinations;
}

