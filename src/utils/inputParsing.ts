export const parseNumbers = (input: string, separator: string = "\n") =>
  input.split(separator).map(line => Number(line));
