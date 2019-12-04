export const getMatchingGroups = (input: number) => {
  const inputString = input.toString();
  const matchingGroups: string[] = [];

  let group = inputString[0];

  for (let i = 1; i < inputString.length; i++) {
    const currentCharacter = inputString[i];
    const previousCharacter = inputString[i - 1];

    if (currentCharacter !== previousCharacter) {
      matchingGroups.push(group);
      group = "";
    }

    group += currentCharacter;
  }

  matchingGroups.push(group);

  matchingGroups.sort((a, b) => b.length - a.length);

  return matchingGroups;
};

export const hasMinimumAdjacentDigits = (input: number, digits: number) => {
  const matchingGroups = getMatchingGroups(input);
  return matchingGroups[0].length >= digits;
};

export const hasExactAdjacentDigits = (input: number, digits: number) => {
  const matchingGroups = getMatchingGroups(input);

  for (const group of matchingGroups) {
    if (group.length === digits) {
      return true;
    }
  }

  return false;
};

export const hasDecreasingDigits = (input: number) => {
  const inputString = input.toString();
  for (let i = 0; i < inputString.length - 1; i++) {
    const currentNumber = Number(inputString[i]);
    const nextNumber = Number(inputString[i + 1]);

    if (nextNumber < currentNumber) {
      return true;
    }
  }

  return false;
};

export const partOne = (input: string) => {
  const [from, to] = input.split("-").map(e => Number(e));

  let possiblePasswords = 0;

  for (let candidate = from; candidate <= to; candidate++) {
    if (
      !hasDecreasingDigits(candidate) &&
      hasMinimumAdjacentDigits(candidate, 2)
    ) {
      possiblePasswords++;
    }
  }

  return possiblePasswords;
};

export const partTwo = (input: string) => {
  const [from, to] = input.split("-").map(e => Number(e));

  let possiblePasswords = 0;

  for (let candidate = from; candidate <= to; candidate++) {
    if (
      !hasDecreasingDigits(candidate) &&
      hasExactAdjacentDigits(candidate, 2)
    ) {
      possiblePasswords++;
    }
  }

  return possiblePasswords;
};
