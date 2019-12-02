type Separator = "\n" | ",";

export const parseNumbers = (input: string, separator: Separator) =>
  input.split(separator).map(line => Number(line));
