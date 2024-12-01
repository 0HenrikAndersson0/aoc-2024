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

