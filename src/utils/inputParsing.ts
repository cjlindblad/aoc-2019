export const parseNumbers = (input: string) =>
  input.split("\n").map(line => Number(line));
